"use client";
import { useEffect, useState } from "react";

export default function EmailOtpLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0); // 120 seconds = 2 minutes

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    const res = await fetch("/api/sendOTP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (data.success) {
      setIsOtpSent(true);
      setMessage("OTP sent to your email!");
      setTimer(60); // ✅ Start 1-minute countdown
    } else {
      setMessage(data.error || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/verifyOTP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();

    if (data.success) {
      setMessage("✅ Login successful!");
      window.location.href = "/CoachDashborad";
    } else {
      setMessage(data.error || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    setOtp("");
    await sendOtp();
  };

  const canResend = timer === 0 && isOtpSent;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-700">
        Login with Email OTP
      </h2>

      {!isOtpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOtp}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border mb-3 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded"
          >
            Verify OTP
          </button>

          {/* Countdown Timer */}
          {timer > 0 && (
            <p className="text-center text-gray-600 mt-3">
              OTP expires in{" "}
              <span className="font-semibold text-emerald-700">
                {formatTime(timer)}
              </span>
            </p>
          )}

          {/* Resend Button */}
          {canResend && (
            <button
              onClick={handleResend}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 mt-3 rounded"
            >
              Resend OTP
            </button>
          )}
        </>
      )}

      {message && (
        <p className="text-center mt-4 text-emerald-700 font-medium">
          {message}
        </p>
      )}
    </div>
  );
}
