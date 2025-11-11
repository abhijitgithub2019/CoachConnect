"use client";

import { useRef, useState, useEffect } from "react";
import { useWebRTC } from "../../component/webRTCHook";

export default function Page() {
  const [roomId, setRoomId] = useState("demo");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const { peers, localStreamRef, shareScreen, sendMessage } = useWebRTC(roomId);
  const localVideoRef = useRef(null);

  useEffect(() => {
    if (!joined) return;
  
    const stream = localStreamRef.current;
    const videoElement = localVideoRef.current;
  
    if (stream && videoElement) {
      videoElement.srcObject = stream;
    }
  }, [joined]);

  return (
    <div className="flex flex-col items-center p-6 gap-6">
      {!joined ? (
        <button
          onClick={() => setJoined(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Join Room
        </button>
      ) : (
        <>
          <div className="flex gap-4 flex-wrap justify-center">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-64 h-48 bg-black rounded-lg border"
            />
            {Array.isArray(peers) && peers.map((peer) => (
              <video
                key={peer.id}
                ref={(el) => {
                  if (el) el.srcObject = peer.stream;
                }}
                autoPlay
                playsInline
                className="w-64 h-48 bg-black rounded-lg border"
              />
            ))}
          </div>

          <button
            onClick={shareScreen}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Share Screen
          </button>

          <div className="w-full max-w-md mt-4">
            <div className="h-40 overflow-y-auto border rounded-md p-2 bg-gray-50 mb-2">
              {chat.map((msg, i) => (
                <p key={i} className="text-sm text-gray-700">
                  {msg}
                </p>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded px-2 py-1"
                placeholder="Type a message..."
              />
              <button
                onClick={() => {
                  if (!message.trim()) return;
                  sendMessage(message);
                  setChat((prev) => [...prev, `You: ${message}`]);
                  setMessage("");
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
