import { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Trophy, X } from "lucide-react";
import "./App.css";
import logo from "./Images/academy.png";

const SEGMENTS = [
  "#06B6D4",
  "#F43F5E",
  "#FBBF24",
  "#6D28D9",
  "#EC4899",
  "#22C55E",
  "#2563EB",
  "#F97316",
];
const COUPONS = [
  { name: "SANTOSH MISHRA", couponCode: "1060" },
  { name: "DIPALI HALDER BISWAS", couponCode: "1093" },
  { name: "SHANKAR kUMAR BALA", couponCode: "1261" },
  { name: "RESMA CHAKRABORTY", couponCode: "1270" },
  { name: "TAPAS KUMAR BYABARTTA", couponCode: "1282" },
  { name: "SK MUSTAQUE AHMED", couponCode: "1283" },
  { name: "TARAK NATH KUNDU", couponCode: "1301" },
  { name: "DEB KUMAR CHAKRABORTY", couponCode: "1847" },
  { name: "DEBOBRATA BANERJEE", couponCode: "1915" },
  { name: "ANAJUL MONDAL", couponCode: "1941" },
  { name: "ANJALI HALDER", couponCode: "2018" },
  { name: "ARUP SARKAR", couponCode: "2176" },
  { name: "DEBENDU KUMAR PAUL", couponCode: "2467" },
  { name: "GAJENDRA SINGH", couponCode: "2803" },
  { name: "SUDIPTA RAY", couponCode: "2913" },
  { name: "BISWAJIT SARDAR", couponCode: "3365" },
  { name: "MOJAFFAR HOSSAIN GAIN", couponCode: "3391" },
  { name: "KOUSHIK GHOSH", couponCode: "3540" },
  { name: "SNEHANGSU DUTTA", couponCode: "4156" },
  { name: "SAGARIKA DAS", couponCode: "4288" },
  { name: "KAMALESH SAHA", couponCode: "4319" },
  { name: "SANKAR SAHA", couponCode: "4663" },
  { name: "RIYA BYABARTTA", couponCode: "4754" },
  { name: "SABYASACHI DAS", couponCode: "4925" },
  { name: "PRAVANJAN PARIA", couponCode: "5574" },
  { name: "KAMAL DAS", couponCode: "5673" },
  { name: "MARUCK MALLICK", couponCode: "6302" },
  { name: "GOBINDA AICH", couponCode: "6590" },
  { name: "SEFALI BISWAS", couponCode: "6623" },
  { name: "SUDHANSU MANDAL", couponCode: "6713" },
  { name: "SUBHAS CHANDRA BISWAS", couponCode: "6847" },
  { name: "SUKOMAL SARKAR", couponCode: "7177" },
  { name: "SUJIT RAHA", couponCode: "7256" },
  { name: "AVIJIT THAKUR", couponCode: "7351" },
  { name: "LAXMI SEN", couponCode: "7596" },
  { name: "BANKIM CH KABIRAJ", couponCode: "8306" },
  { name: "SUJAN DAM", couponCode: "8352" },
  { name: "MOSTAKIN MONDAL", couponCode: "8513" },
  { name: "DEBABRATA MONDAL", couponCode: "9089" },
  { name: "SUBHAS SARKAR", couponCode: "9142" },
  { name: "SUBHASH CHANDRA MAITY", couponCode: "9201" },
  { name: "SUJIT PAL", couponCode: "9477" },
  { name: "MITHUN SARKAR", couponCode: "9722" },
  { name: "DEBABRATA BHAUMIK", couponCode: "9892" },
  { name: "SASANKA MANDAL", couponCode: "2683" },
  { name: "TAPAS KUMAR JANA", couponCode: "5443" },
  { name: "HARICHARAN BISWAS", couponCode: "7713" },
  { name: "SOUMI BHAUMIK", couponCode: "8349" },
  { name: "TAPAS KUMAR LAHIRI", couponCode: "8687" },
  { name: "PARTHA DAS", couponCode: "1037" },
  { name: "SUBHANKAR BISWAS", couponCode: "1428" },
  { name: "PULAK PUTUTUNDA", couponCode: "2359" },
  { name: "BIPLAB SAHA", couponCode: "3084" },
  { name: "BABUL BISWAS", couponCode: "3927" },
  { name: "PAMPA RAHA", couponCode: "5086" },
  { name: "SULATA BARMAN", couponCode: "6139" },
  { name: "KAMALA BAIJYA", couponCode: "8462" },
  {name: "JHUMUR BISWAS", couponCode: "1185" },
];
const LABEL = "YOUR LUCKY NUMBER";

export default function App() {
  const [spinning, setSpinning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState(() => {
  const usedCodes = JSON.parse(
    localStorage.getItem("usedCouponCodes") || "[]"
  );

  return COUPONS.filter(
    (coupon) => !usedCodes.includes(coupon.couponCode)
  );
});

 
const spinWheel = () => {
  if (spinning || availableCoupons.length === 0) return;

  // Select only unused coupons
  const randomIndex = Math.floor(
    Math.random() * availableCoupons.length
  );

  const selectedWinner = availableCoupons[randomIndex];

  // Save the coupon code as used
  const usedCodes = JSON.parse(
    localStorage.getItem("usedCouponCodes") || "[]"
  );

  const updatedUsedCodes = [
    ...new Set([...usedCodes, selectedWinner.couponCode]),
  ];

  localStorage.setItem(
    "usedCouponCodes",
    JSON.stringify(updatedUsedCodes)
  );

  // Remove this coupon from the available list
  setAvailableCoupons((prev) =>
    prev.filter(
      (coupon) => coupon.couponCode !== selectedWinner.couponCode
    )
  );

  setWinner(selectedWinner);
  setSpinning(true);
  setShowPopup(false);

  const extraRotation = 360 * 12 + Math.random() * 360;

  setRotation((prev) => prev + extraRotation);

  setTimeout(() => {
    setSpinning(false);
    setShowPopup(true);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, 15000);
};

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-icon">
            <img src={logo} alt="Academy Logo" />
          </span>
        </a>

        <div className="top-label">
          <span className="live-dot" />
          LUCKY DRAW EVENT
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">
          <Sparkles size={15} />
          YOUR MOMENT. YOUR LUCK.
        </div>

        <h1>
          Spin the wheel.
          <br />
          <span>Discover your luck.</span>
        </h1>

        <p className="subtitle">
          One spin could make this moment unforgettable.
          <br className="desktop-break" />
          Are you ready to try your luck?
        </p>

        <div className="wheel-area">
          <div className="wheel-glow" />

          <div className="pointer">
            <span />
          </div>

          <div
            className={`wheel ${spinning ? "is-spinning" : ""}`}
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <svg
              className="wheel-svg"
              viewBox="0 0 400 400"
              role="img"
              aria-label="Colorful lucky spin wheel"
            >
              {SEGMENTS.map((color, i) => {
                const startAngle = i * 45 - 90;
                const endAngle = startAngle + 45;

                const point = (angle, radius) => {
                  const radians = (angle * Math.PI) / 180;
                  return {
                    x: 200 + radius * Math.cos(radians),
                    y: 200 + radius * Math.sin(radians),
                  };
                };

                const start = point(startAngle, 190);
                const end = point(endAngle, 190);
                const mid = point(startAngle + 22.5, 125);

                const textRotation = startAngle + 22.5 + 90;

                return (
                  <g key={i}>
                    <path
                      d={`M 200 200 L ${start.x} ${start.y} A 190 190 0 0 1 ${end.x} ${end.y} Z`}
                      fill={color}
                      stroke="#080808"
                      strokeWidth="3"
                    />

                    <text
                      x={mid.x}
                      y={mid.y}
                      fill="#111111"
                      fontSize="11"
                      fontWeight="900"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textRotation}, ${mid.x}, ${mid.y})`}
                      letterSpacing="0.5"
                    >
                      <tspan x={mid.x} dy="-6">
                        YOUR LUCKY
                      </tspan>
                      <tspan x={mid.x} dy="13">
                        NUMBER
                      </tspan>
                    </text>
                  </g>
                );
              })}

              <circle
                cx="200"
                cy="200"
                r="48"
                fill="#090909"
                stroke="#FFFFFF"
                strokeWidth="3"
              />
              <circle
                cx="200"
                cy="200"
                r="40"
                fill="none"
                stroke="#F5D04B"
                strokeWidth="1.5"
              />
            </svg>

            <button
              className="spin-button"
              onClick={spinWheel}
              disabled={spinning}
              aria-label="Spin the wheel"
            >
              <Sparkles size={19} />
              <span>{spinning ? "SPINNING" : "SPIN"}</span>
            </button>
          </div>
        </div>

        <div className="spin-caption">
          <span className="caption-line" />
          <span>
            {spinning
              ? "GOOD LUCK! THE WHEEL IS SPINNING..."
              : "TAKE A DEEP BREATH & LET'S SPIN"}
          </span>
          <span className="caption-line" />
        </div>

        <div className="feature-row">
          <div className="feature">
            <span className="feature-icon green">
              <Sparkles size={19} />
            </span>
            <div>
              <strong>One Lucky Moment</strong>
              <small>A special surprise awaits</small>
            </div>
          </div>

          <div className="feature">
            <span className="feature-icon gold">
              <Trophy size={19} />
            </span>
            <div>
              <strong>Lucky Winner</strong>
              <small>Every spin tells a story</small>
            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="modal-backdrop" onClick={() => setShowPopup(false)}>
          <section
            className="winner-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
              aria-label="Close popup"
            >
              <X size={21} />
            </button>

            <div className="winner-icon">
              <Trophy size={34} />
            </div>

            <div className="winner-eyebrow">
              <Sparkles size={15} />
              THE MOMENT IS HERE
            </div>

            <h2>Congratulations!</h2>

            <p className="winner-message">Your lucky moment has arrived.</p>

            <div className="winner-details">
              <small>WINNER NAME</small>
              <strong>{winner?.name}</strong>

              <small>COUPON CODE</small>
              <span>{winner?.couponCode}</span>
            </div>

            <button className="modal-done" onClick={() => setShowPopup(false)}>
              CONTINUE
            </button>
          </section>
        </div>
      )}

      {/* <footer className="footer">
        <span>© {new Date().getFullYear()} SYNTHOSPHERE ACADEMY</span>
        <span>MADE FOR YOUR LUCKY MOMENT ✦</span>
      </footer> */}
    </main>
  );
}
