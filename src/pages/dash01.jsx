import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ph1 from "../images/ph1.png";
import ph2 from "../images/ph2.png";
import ph3 from "../images/ph3.png";

function Dash01() {
  const [selectedPhysique, setSelectedPhysique] = useState(null);
const navigate = useNavigate();
  const physiques = [
    {
      id: 1,
      title: "LEAN AESTHETIC",
      image: ph1,
    },
    {
      id: 2,
      title: "ATHLETIC BUILD",
      image: ph2,
    },
    {
      id: 3,
      title: "MASS MONSTER",
      image: ph3,
    },
  ];

  const handleContinue = () => {
    const chosen = physiques.find(
      (p) => p.id === selectedPhysique
    );
   
    navigate("/"+selectedPhysique);
    console.log("Selected Physique:", chosen.title);

    localStorage.setItem(
      "physique",
      chosen.title
    );

    alert(`${chosen.title} selected!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay} />

      <h1 style={styles.title}>
        CHOOSE YOUR DREAM PHYSIQUE
      </h1>

      <p style={styles.subtitle}>
        The System requires a destination before the journey begins.
      </p>

      <div style={styles.cardContainer}>
        {physiques.map((physique) => (
          <div
            key={physique.id}
            onClick={() =>
              setSelectedPhysique(physique.id)
            }
            style={{
              ...styles.card,
              ...(selectedPhysique === physique.id
                ? styles.selectedCard
                : {}),
            }}
          >
            <img
              src={physique.image}
              alt={physique.title}
              style={{
                ...styles.image,
                ...(selectedPhysique === physique.id
                  ? styles.selectedImage
                  : {}),
              }}
            />

            <div style={styles.titleOverlay}>
              {physique.title}
            </div>
          </div>
        ))}
      </div>

      {selectedPhysique && (
        <button
          style={styles.button}
          onClick={handleContinue}
        >
          ACCEPT QUEST
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at center, #08192f 0%, #02050f 60%, #000000 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    overflow: "hidden",
    position: "relative",
    padding: "40px 20px",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, rgba(0,180,255,0.15), transparent 70%)",
    pointerEvents: "none",
  },

  title: {
    fontSize: "clamp(32px, 5vw, 56px)",
    color: "#00f0ff",
    textShadow: "0 0 20px #00f0ff",
    letterSpacing: "4px",
    textAlign: "center",
    zIndex: 2,
  },

  subtitle: {
    color: "#ff0000",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "50px",
    textAlign: "center",
    fontSize: "18px",
    zIndex: 2,
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "40px",
    zIndex: 2,
  },

  card: {
    width: "300px",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.35s ease",
  },

  selectedCard: {
    transform: "scale(1.06)",
  },

  image: {
    width: "100%",
    height: "460px",
    objectFit: "cover",
    borderRadius: "14px",
    boxShadow:
      "0 0 25px rgba(0,240,255,0.25)",
    transition: "all 0.35s ease",
  },

  selectedImage: {
    boxShadow:
      "0 0 30px #00f0ff, 0 0 80px rgba(0,240,255,0.8)",
  },

  titleOverlay: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.75)",
    color: "#00f0ff",
    padding: "12px 20px",
    borderRadius: "25px",
    fontWeight: "bold",
    letterSpacing: "2px",
    textShadow: "0 0 10px #00f0ff",
    whiteSpace: "nowrap",
  },

  button: {
    marginTop: "50px",
    padding: "16px 40px",
    border: "2px solid #00f0ff",
    background: "transparent",
    color: "#00f0ff",
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "3px",
    cursor: "pointer",
    borderRadius: "0px",
    boxShadow:
      "0 0 20px rgba(0,240,255,0.4)",
    transition: "0.3s",
    zIndex: 2,
  },
};

export default Dash01;