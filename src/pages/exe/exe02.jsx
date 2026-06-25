import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Final() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (email) {
          const res = await fetch(`http://localhost:5000/user/${email}`);
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.user) {
              setUser(data.user);
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.log("Backend not available, using demo data");
      }

      // Fallback mock data (when backend fails)
      const mockUser = {
        email: email || "demo@fitness.com",
        physique: "lean", // change to "muscular" or "beast" to test different plans
        stats: {
          weight: "78",
          height: "178",
          age: "28",
          bodyFat: "12.5",
        },
      };

      setUser(mockUser);
      setLoading(false);
    };

    loadUser();
  }, [email]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        INITIALIZING SYSTEM...
      </div>
    );
  }

  const exercises = {
    lean: ["Running - 20 min", "Push Ups - 3x15", "Plank - 3x60s"],
    muscular: ["Bench Press - 4x10", "Pull Ups - 4x8", "Curls - 3x12"],
    beast: ["Deadlift - 5x5", "Squats - 5x5", "Weighted Pull Ups"],
  };

  const plan = exercises[user.physique?.toLowerCase()] || [];

  return (
    <div style={styles.container}>
      <div style={styles.grid} />
      <div style={styles.overlay} />
      <div style={styles.glow} />

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>SYSTEM DASHBOARD</h1>
          <div style={styles.status}>ONLINE</div>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoRow}>
            <span style={styles.label}>OPERATIVE</span>
            <span style={styles.value}>{user.email}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>PHYSIQUE PROTOCOL</span>
            <span style={styles.value}>{user.physique?.toUpperCase() || "NOT CALIBRATED"}</span>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>WEIGHT</div>
              <div style={styles.statValue}>{user.stats?.weight || "--"} kg</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>HEIGHT</div>
              <div style={styles.statValue}>{user.stats?.height || "--"} cm</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>AGE</div>
              <div style={styles.statValue}>{user.stats?.age || "--"}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>BODY FAT</div>
              <div style={styles.statValue}>{user.stats?.bodyFat || "--"}%</div>
            </div>
          </div>
        </div>

        <div style={styles.workoutSection}>
          <h2 style={styles.sectionTitle}>TODAY'S PROTOCOL</h2>
          
          <div style={styles.exerciseList}>
            {plan.length === 0 ? (
              <div style={styles.noPlan}>No physique selected. Update your profile.</div>
            ) : (
              plan.map((ex, i) => (
                <div key={i} style={styles.exerciseItem}>
                  <span style={styles.exerciseNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{ex}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          style={styles.button}
          onClick={() => navigate("/dash01")}
        >
          RECALIBRATE PHYSIQUE
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#05040f",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "system-ui, Arial, sans-serif",
  },

  grid: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to_right, #1a1a2e_1px, transparent_1px), linear-gradient(to_bottom, #1a1a2e_1px, transparent_1px)",
    backgroundSize: "60px 60px",
    opacity: 0.4,
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to_bottom, transparent, #000000cc)",
  },

  glow: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    height: "700px",
    background: "rgba(103, 232, 249, 0.12)",
    borderRadius: "50%",
    filter: "blur(140px)",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "rgba(10, 10, 20, 0.85)",
    border: "1px solid rgba(103, 232, 249, 0.3)",
    borderRadius: "24px",
    padding: "40px 32px",
    boxShadow: "0 0 50px rgba(103, 232, 249, 0.15)",
    zIndex: 2,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "900",
    letterSpacing: "-1px",
    background: "linear-gradient(to_right, #67e8f9, white)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  status: {
    color: "#34d399",
    fontSize: "13px",
    letterSpacing: "2px",
  },

  infoSection: {
    marginBottom: "35px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(103, 232, 249, 0.1)",
  },

  label: {
    color: "#67e8f9",
    fontSize: "13px",
    letterSpacing: "1px",
  },

  value: {
    color: "white",
    fontWeight: "500",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginTop: "20px",
  },

  statItem: {
    background: "rgba(0,0,0,0.4)",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(103, 232, 249, 0.2)",
  },

  statLabel: {
    fontSize: "11px",
    color: "#67e8f9",
    letterSpacing: "1px",
  },

  statValue: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "4px",
  },

  workoutSection: {
    marginBottom: "30px",
  },

  sectionTitle: {
    textAlign: "center",
    color: "#67e8f9",
    fontSize: "18px",
    letterSpacing: "3px",
    marginBottom: "20px",
  },

  exerciseList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  exerciseItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "14px 18px",
    background: "rgba(0,0,0,0.5)",
    border: "1px solid rgba(103, 232, 249, 0.15)",
    borderRadius: "14px",
  },

  exerciseNumber: {
    color: "#67e8f9",
    fontSize: "20px",
    fontWeight: "bold",
    minWidth: "32px",
  },

  noPlan: {
    textAlign: "center",
    color: "#888",
    padding: "30px",
  },

  button: {
    width: "100%",
    padding: "18px",
    background: "transparent",
    border: "2px solid #67e8f9",
    color: "#67e8f9",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "2px",
    borderRadius: "16px",
    cursor: "pointer",
  },

  loadingContainer: {
    height: "100vh",
    background: "#05040f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#67e8f9",
    fontSize: "18px",
  },
};

export default Final;