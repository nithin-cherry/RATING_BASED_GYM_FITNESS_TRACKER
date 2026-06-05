import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ln from "../images/landing.mp4";

function Landing() {
  const navigate = useNavigate();

  const [ isMobile, setIsMobile ] = useState(window.innerWidth < 768);
  const [ isButtonHovered, setIsButtonHovered ] = useState(false);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);




  const handleArise = () => {
    navigate("/Login");
  };

  return (
    <div style={style.container}>
      <video 
        autoPlay muted loop 
        playsInline
        type="video/mp4"
        src={ln}
        style={style.vid}
      ></video>
      <div style={style.shadowOverlay} />

      <div style={style.frame}>
        <div style={isMobile ? style.innerContentMobile : style.innerContent}>
          <div style={style.leftPanel}>
            <div style={style.systemHeader}>
              <span style={style.levelText}>LV.1</span>
              <h1 style={style.title}>SHADOW MONARCH SYSTEM</h1>
            </div>

            <p style={style.subtitle}>
              The gates have opened.
              <br />
              You have been chosen.
            </p>
          </div>

          <div style={style.rightPanel}>
            <div style={style.glowBox}>
              <p style={style.systemText}>
                [SYSTEM NOTICE]
                <br />
                Player detected.
                <br />
                Hidden Quest:{" "}
                <span style={{ color: "#ff3366" }}>
                  Awakening
                </span>{" "}
                has begun.
              </p>
            </div>

            <div style={style.status}>
              <div>STR • VIT • AGI • INT • SENSE</div>

              
            </div>

            <button
              style={{
                ...style.button,
                ...(isButtonHovered && style.buttonHover),
              }}
              onClick={handleArise}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              ARISE
            </button>

            <p style={style.warning}>
              Warning: Once accepted, there is no turning back.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const style = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at center, #0a0a1f 0%, #000000 65%)",
    color: "white",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    overflow: "hidden",
    zIndex: 1,
    position: "relative",
  },

  vid:{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
    filter: "brightness(0.65) contrast(1.1)",
  },

  shadowOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 50% 40%, rgba(0, 130, 255, 0.22) 0%, transparent 70%)",
    pointerEvents: "none",
        zIndex: 1,
  },

  frame: {
    padding: "clamp(40px, 6vw, 65px)",
    borderRadius: "8px",
    border: "2px solid rgba(0, 191, 255, 0.6)",
    boxShadow:
      "0 0 120px rgba(0, 180, 255, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.9)",
    background: "rgba(2, 5, 18, 0.6)",
    width: "min(94vw, 1100px)",
        zIndex: 1,
    maxWidth: "1100px",
  },

  innerContent: {
    display: "flex",
    flexDirection: "row",
    gap: "70px",
    alignItems: "center",
  },

  innerContentMobile: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    alignItems: "center",
  },

  leftPanel: {
    flex: 1.15,
    textAlign: "center",
  },

  rightPanel: {
    flex: 1,
    textAlign: "center",
  },

  systemHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "18px",
  },

  levelText: {
    fontSize: "clamp(20px, 3.8vw, 27px)",
    fontWeight: "bold",
    color: "#00fff7",
    textShadow: "0 0 20px #00ffcc",
  },

  title: {
    fontSize: "clamp(44px, 7.5vw, 64px)",
    fontWeight: "900",
    letterSpacing: "clamp(6px, 1.5vw, 11px)",
    background:
      "linear-gradient(90deg, #00c3ff, #0099ff, #00c3ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 45px #822eff",
  },

  subtitle: {
    fontSize: "clamp(16.5px, 3.4vw, 21px)",
    opacity: 0.93,
    lineHeight: "1.7",
    color: "#ff0000",
    fontWeight: "bold",
  },

  glowBox: {
    padding: "24px",
    border: "1px solid rgba(0, 191, 255, 0.7)",
    boxShadow: "0 0 30px rgba(255, 0, 0, 0.5)",
    borderRadius: "6px",
    background: "rgba(0, 20, 50, 0.6)",
    marginBottom: "34px",
  },

  systemText: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#d9e7ff",
  },

  status: {
    marginBottom: "25px",
    color: "#cfd8ff",
    fontSize: "14px",
  },

  progressBar: {
    width: "100%",
    height: "8px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "4px",
    marginTop: "10px",
    overflow: "hidden",
  },

  progressFill: {
    width: "70%",
    height: "100%",
    background:
      "linear-gradient(90deg, #00c3ff, #0099ff)",
    boxShadow: "0 0 15px rgba(0, 195, 255, 0.8)",
  },

  button: {
    padding: "18px 60px",
    marginTop: "20px",
    fontSize: "clamp(16.5px, 3.7vw, 19.5px)",
    fontWeight: "bold",
    letterSpacing: "5px",
    cursor: "pointer",
    border: "2px solid #00bfff",
    borderRadius: "6px",
    background: "transparent",
    color: "#00f0ff",
    boxShadow: "0 0 5px rgba(0, 191, 255, 0.7)",
    transition: "all 0.2s ease",
    width: "100%",
    maxWidth: "360px",
  },

  isButtonHovered: {
    transform: "scale(1.1)",
    background: "rgba(0, 191, 255, 0.12)",
    boxShadow: "0 0 65px rgb(116, 116, 116)",
    borderColor: "#67ffff",
    color: "#ff0000",
  },

  warning: {
    marginTop: "20px",
    fontSize: "13px",
    color: "#ff6b6b",
    opacity: 0.9,
  },
};

export default Landing;