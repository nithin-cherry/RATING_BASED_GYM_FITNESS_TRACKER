import { useState } from "react";
import sk from "../images/sk.mp4";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      alert("SYSTEM: Awakening sequence initiated...");
      setIsEntering(false);
    }, 1800);
  };

  return (
    <div style={styles.container}>
      <video autoPlay loop muted playsInline style={styles.video}>
        <source src={sk} type="video/mp4" />
      </video>

      <div style={styles.overlay} />

      <div style={styles.card}>
        {/* System Header */}
        <div style={styles.systemHeader}>
          <div style={styles.systemLogo}>【 SYSTEM 】</div>
          <div style={styles.title}>SOLO LEVELING</div>
          <div style={styles.subtitle}>THE GATE HAS OPENED</div>
        </div>

        <div style={styles.statusBar}>
          <p>Player: <span style={{ color: "#00f0ff" }}>{username || "UNKNOWN"}</span></p>
          <p>Rank: <span style={{ color: "#ff3366" }}>E</span>-Class Hunter</p>
          <p>Level: <span style={{ color: "#ffd700" }}>01</span></p>
        </div>

        <input
          type="text"
          placeholder="HUNTER ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="ACCESS CODE"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={handleEnter}
          disabled={isEntering}
        >
          {isEntering ? "AWAKENING..." : "ENTER THE GATE"}
        </button>

        <div style={styles.warning}>
           ONCE YOU ENTER, THERE IS NO TURNING BACK
        </div>

        <div style={styles.infoBox}>
          <p>Job: <span style={{ color: "#00f0ff" }}>Necromancer (Hidden)</span></p>
          <p>Shadow Soldiers: <span style={{ color: "#888" }}>0 / ∞</span></p>
        </div>

        <p style={styles.footer}>
          "THERE IS NO GOING BACK"
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000",
    overflow: "hidden",
    position: "relative",
    padding: "20px",
  },

  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
    filter: "brightness(0.65) contrast(1.1)",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at center, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.92) 80%)",
    zIndex: 1,
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "35px 32px 30px",       
    border: "1px solid #00f0ff",
    borderRadius: "8px",
    background: "rgba(5, 10, 25, 0.93)",
    boxShadow: "0 0 40px rgba(0, 240, 255, 0.35), inset 0 0 25px rgba(0, 240, 255, 0.1)",
    color: "white",
    zIndex: 2,
    position: "relative",
  },

  systemHeader: {
    textAlign: "center",
    marginBottom: "22px",           
  },

  systemLogo: {
    fontSize: "12px",
    letterSpacing: "4px",
    color: "#00f0ff",
    marginBottom: "4px",
  },

  title: {
    fontSize: "clamp(26px, 7vw, 32px)",
    fontWeight: "bold",
    color: "#00f0ff",
    textShadow: "0 0 15px #00f0ff",
    margin: "0 0 6px 0",
  },

  subtitle: {
    fontSize: "clamp(13px, 3.5vw, 14px)",
    color: "#ff3366",
    letterSpacing: "3px",
  },

  statusBar: {
    background: "rgba(0, 240, 255, 0.08)",
    border: "1px solid rgba(0, 240, 255, 0.3)",
    padding: "10px 14px",
    marginBottom: "20px",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  input: {
    width: "92%",
      padding: "13px 16px",
      marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "14px",
    background: "#0a0f1f",
    color: "white",
    border: "1px solid #00b8ff",
    borderRadius: "4px",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "15px",
    margin: "8px 0 12px 0",
    background: "transparent",
    color: "#00f0ff",
    border: "2px solid #00f0ff",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "3px",
    cursor: "pointer",
    transition: "all 0.4s",
  },

  warning: {
    marginTop: "10px",
    padding: "10px",
    background: "rgba(255, 51, 102, 0.1)",
    borderLeft: "4px solid #ff3366",
    fontSize: "13px",
    color: "#ff99aa",
    textAlign: "center",
  },

  infoBox: {
    marginTop: "18px",
    padding: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "4px",
    fontSize: "14px",
    background: "rgba(0,0,0,0.4)",
  },

  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "13px",
    opacity: 0.8,
    fontStyle: "italic",
  },
};

export default Login;