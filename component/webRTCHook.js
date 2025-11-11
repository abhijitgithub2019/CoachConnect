"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useWebRTC = (roomId) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef(null);
  const pcRefs = useRef({});
  const localStreamRef = useRef(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
      transports: ["websocket"],
    });
    
    socketRef.current = socket;
  
    const startLocalStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      return stream;
    };
  
    const createPeerConnection = (peerId, socketInstance) => {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
  
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current);
        });
      }
  
      const remoteStream = new MediaStream();
      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
        setPeers((prev) => {
          const exists = prev.find((p) => p.id === peerId);
          if (exists) return prev;
          return [...prev, { id: peerId, stream: remoteStream }];
        });
      };
  
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketInstance.emit("ice-candidate", { to: peerId, candidate: event.candidate });
        }
      };
  
      pcRefs.current[peerId] = pc;
      return pc;
    };
  
    startLocalStream().then((stream) => {
      socket.emit("join-room", roomId);
  
      socket.on("user-joined", async (peerId) => {
        const pc = createPeerConnection(peerId, socket);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { to: peerId, offer });
      });
  
      socket.on("offer", async ({ from, offer }) => {
        const pc = createPeerConnection(from, socket);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { to: from, answer });
      });
  
      socket.on("answer", async ({ from, answer }) => {
        const pc = pcRefs.current[from];
        if (pc) await pc.setRemoteDescription(new RTCSessionDescription(answer));
      });
  
      socket.on("ice-candidate", async ({ from, candidate }) => {
        const pc = pcRefs.current[from];
        if (pc) await pc.addIceCandidate(new RTCIceCandidate(candidate));
      });
  
      socket.on("message", ({ from, text }) => {
        console.log(`💬 ${from}: ${text}`);
      });
    });
  
    // ✅ Copy the current ref values for safe cleanup
    const localPcRefs = pcRefs.current;
    const localSocket = socket;
  
    return () => {
      localSocket.disconnect();
      Object.values(localPcRefs).forEach((pc) => pc.close());
    };
  }, [roomId]);
  

  const shareScreen = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const track = stream.getVideoTracks()[0];
    Object.values(pcRefs.current).forEach((pc) => {
      const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
      if (sender) sender.replaceTrack(track);
    });
  };

  const sendMessage = (text) => {
    socketRef.current?.emit("message", { roomId, text });
  };

  return { peers, localStreamRef, shareScreen, sendMessage };
};
