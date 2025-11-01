"use client";

export default function InfinityGlow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 480"
      width="600"
      height="200"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="220%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id="grad"
          x1="0"
          x2="1000"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00aaff" stopOpacity="0" />
          <stop offset="40%" stopColor="#00d4ff" />
          <stop offset="60%" stopColor="#0098ff" />
          <stop offset="100%" stopColor="#00aaff" stopOpacity="0" />
        </linearGradient>

        <path
          id="infinityPath"
          d="
      M 120 240
      C 120 120, 380 120, 500 240
      C 620 360, 880 360, 880 240
      C 880 120, 620 120, 500 240
      C 380 360, 120 360, 120 240
    "
          fill="none"
        />
      </defs>

      <radialGradient id="halo" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <rect width="200%" height="100%" fill="transparent" />

      <use
        href="#infinityPath"
        stroke="#00baff"
        strokeWidth="22"
        opacity="0.05"
        filter="url(#glow)"
      />

      <use
        href="#infinityPath"
        stroke="#009eff"
        strokeWidth="5"
        filter="url(#glow)"
        opacity="0.6"
      />

      <path
        d="
      M 120 240
      C 120 120, 380 120, 500 240
      C 620 360, 880 360, 880 240
      C 880 120, 620 120, 500 240
      C 380 360, 120 360, 120 240
    "
        fill="none"
        stroke="url(#grad)"
        strokeWidth="10"
        strokeLinecap="round"
        filter="url(#glow)"
        strokeDasharray="0 1000"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0 1000; 400 600; 0 1000"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-1200"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      <g filter="url(#glow)">
        <circle cx="250" cy="180" r="4" fill="#50C878">
          <animate
            attributeName="r"
            values="1;3;1"
            dur="1.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="500" cy="320" r="1.8" fill="#2ecc71">
          <animate
            attributeName="r"
            values="1;4;1"
            dur="2.2s"
            begin="0.3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="2.2s"
            begin="0.3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="760" cy="170" r="4" fill="#00c77f">
          <animate
            attributeName="r"
            values="1;3.5;1"
            dur="2s"
            begin="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="2s"
            begin="0.6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="300" cy="280" r="4" fill="#00d68f">
          <animate
            attributeName="r"
            values="1;4;1"
            dur="1.5s"
            begin="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="1.5s"
            begin="1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="640" cy="340" r="4" fill="#20e38a">
          <animate
            attributeName="r"
            values="2;5;2"
            dur="2.4s"
            begin="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="2.4s"
            begin="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      <g
        fontFamily="Arial, sans-serif"
        fontSize="42"
        fontWeight="600"
        fill="#00694d"
      >
        <g id="coachGroup">
          <path
            d="M 0 -8 a 4 4 0 1 1 0.001 0z M -4 0 q 4 -6 8 0 v 8 h -8 z"
            fill="#00694d"
          />

          <text x="10" y="5">
            Coach Connect
          </text>
        </g>
        <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
          <mpath href="#infinityPath" />
        </animateMotion>
      </g>

      <g filter="url(#glow)">
        <circle r="2" fill="#00e38a" opacity="0.9">
          <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
            <mpath href="#infinityPath" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;0.3;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="2.2" fill="#00d38a" opacity="0.8">
          <animateMotion
            dur="3.5s"
            begin="0.8s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#infinityPath" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;0.2;0"
            dur="3.5s"
            begin="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}
