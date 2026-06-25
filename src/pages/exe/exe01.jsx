import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "../../images/ex01.mp4";

function Exe01() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    weight: "",
    bodyFat: "",
    height: "",
    age: "",
    gender: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  if (
    !stats.weight ||
    !stats.bodyFat ||
    !stats.height ||
    !stats.age ||
    !stats.gender
  ) {
    alert("Fill all system parameters!");
    return;
  }

  try {
    const res = await fetch(
      "https://rating-based-gym-fitness-tracker.onrender.com/save-stats",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          weight: stats.weight,
          bodyFat: stats.bodyFat,
          height: stats.height,
          age: stats.age,
          gender: stats.gender,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);

      setTimeout(() => {
        navigate("/2");
      }, 1500);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  return (
    <div style={styles.container}>
      <video autoPlay loop muted playsInline style={styles.video}>
        <source src={bg} type="video/mp4" />
      </video>

      <div style={styles.overlay} />
      <div style={styles.glowOrb} />

      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.neuralTag}>NEURAL INTERFACE v1.0</div>

          <h1 style={styles.title}>SYSTEM INITIALIZATION</h1>

          <p style={styles.subtitle}>
            Enter your biometric data to begin calibration
          </p>
        </div>

        <div style={styles.card}>
          <input
            name="weight"
            placeholder="Weight"
            value={stats.weight}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="bodyFat"
            placeholder="Body Fat"
            value={stats.bodyFat}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="height"
            placeholder="Height"
            value={stats.height}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="age"
            placeholder="Age"
            value={stats.age}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="gender"
            value={stats.gender}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button onClick={handleSubmit} style={styles.button}>
            INITIALIZE SYSTEM
          </button>

          {submitted && (
            <div style={styles.success}>
              SYSTEM LOCKED • DATA SAVED
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    color: "white",
    fontFamily: "Arial",
    background: "#000",
  },

  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 1,
    filter: "brightness(0.45)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.95))",
    zIndex: 2,
  },

  glowOrb: {
    position: "absolute",
    width: "650px",
    height: "650px",
    background: "rgba(18, 158, 158, 0.18)",
    filter: "blur(100px)",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },

  content: {
    position: "relative",
    zIndex: 3,
    width: "520px",       
    textAlign: "center",
  },

  header: {
    marginBottom: "40px",
  },

  neuralTag: {
    fontSize: "14px",
    letterSpacing: "4px",
    color: "#67e8f9",
    marginBottom: "14px",
  },

  title: {
    fontSize: "38px",       
    fontWeight: "900",
    color: "#56f4ff",
    textShadow: "0 0 25px #466062",
    marginBottom: "10px",
  },

  subtitle: {
      color: "#ff0000",
      fontWeight: "900",
    fontSize: "16px",
  },

  card: {
    background: "rgba(0,0,0,0.7)",
    border: "1px solid rgba(0,255,255,0.25)",
    padding: "28px",
    borderRadius: "6px",    
    backdropFilter: "blur(12px)",
  },

  input: {
    width: "93%",
    marginBottom: "14px",
    padding: "14px",
    borderRadius: "4px",    
    border: "1px solid #00f0ff",
    background: "#000",
    color: "white",
    fontSize: "14px",
  },

  select: {
    width: "100%",
    marginBottom: "14px",
    padding: "14px",
    borderRadius: "4px",
    border: "1px solid #00f0ff",
    background: "#000",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "transparent",
    border: "2px solid #00f0ff",
    color: "#00f0ff",
    cursor: "pointer",
    letterSpacing: "2px",
    fontWeight: "bold",
  },

  success: {
    marginTop: "15px",
    color: "#00ff99",
    fontSize: "12px",
    letterSpacing: "2px",
  },
};

export default Exe01;
