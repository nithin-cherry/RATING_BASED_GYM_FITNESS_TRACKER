import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../images/ahhhh.mp4";

function Final() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completing, setCompleting] = useState(false);

  const exercisePool = {
    lean: ["Running - 20 min", "Push Ups - 3x15", "Plank - 3x60s", "Burpees - 4x10", "Jumping Jacks - 3x45s"],
    muscular: ["Bench Press - 4x10", "Pull Ups - 4x8", "Curls - 3x12", "Deadlift - 4x8", "Squats - 4x12"],
    beast: ["Deadlift - 5x5", "Squats - 5x5", "Weighted Pull Ups - 4x6", "Bench Press - 5x5", "Military Press - 4x8"],
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!email) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`https://rating-based-gym-fitness-tracker.onrender.com/user/${email}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setError("Failed to load profile");
        }
      } catch (err) {
        console.error(err);
        setError("System connection error");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [email]);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const dailyWorkout = user?.dailyWorkout || null;
  const isTodayWorkout = dailyWorkout?.date === today;
  const currentExercises = isTodayWorkout ? dailyWorkout.exercises : [];

  const generateDailyWorkout = () => {
    const physiqueKey = (user?.physique || "muscular").toLowerCase();
    const pool = exercisePool[physiqueKey] || exercisePool.muscular;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const saveDailyWorkout = async (exercises) => {
    try {
      const payload = {
        dailyWorkout: {
          date: today,
          exercises: exercises,
          completedAt: new Date().toISOString()
        }
      };
      const res = await fetch(`https://rating-based-gym-fitness-tracker.onrender.com/user/${email}/daily-workout`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update workout");
      const data = await res.json();
      if (data.success) {
        setUser(prev => ({ ...prev, dailyWorkout: payload.dailyWorkout }));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save workout");
    }
  };

 
  useEffect(() => {
    if (loading || !user || isTodayWorkout) return;

    const newExercises = generateDailyWorkout();
    saveDailyWorkout(newExercises);
  }, [loading, user, isTodayWorkout]);

  const completeWorkout = async () => {
    if (!user || completing) return;
    setCompleting(true);
    try {
      const newExercises = generateDailyWorkout();
      await saveDailyWorkout(newExercises);
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  const stats = useMemo(() => {
    if (!user?.stats) return { bmi: "--", bmiStatus: "UNKNOWN", bmr: "--", targetCalories: "--" };
    const { weight, height, age, gender, bodyFat } = user.stats;
    const w = Number(weight || 0);
    const h = Number(height || 0);
    const a = Number(age || 0);
    const bmi = w && h ? (w / ((h / 100) ** 2)).toFixed(1) : "--";
    let bmiStatus = "UNKNOWN";
    if (bmi !== "--") {
      if (bmi < 18.5) bmiStatus = "UNDERWEIGHT";
      else if (bmi < 25) bmiStatus = "HEALTHY";
      else if (bmi < 30) bmiStatus = "OVERWEIGHT";
      else bmiStatus = "OBESE";
    }
    const bmr = w && h && a
      ? gender === "female"
        ? Math.round(10 * w + 6.25 * h - 5 * a - 161)
        : Math.round(10 * w + 6.25 * h - 5 * a + 5)
      : "--";
    const maintenance = bmr !== "--" ? Math.round(bmr * 1.55) : "--";
    const targetCalories = maintenance !== "--" ? maintenance + 300 : "--";
    return { bmi, bmiStatus, bmr, targetCalories };
  }, [user]);

  if (loading) {
    return <div style={styles.loadingContainer}>INITIALIZING SYSTEM...</div>;
  }

  if (error || !user) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.errorText}>{error || "USER NOT FOUND"}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <video autoPlay muted loop playsInline style={styles.video}>
        <source src={bg} type="video/mp4" />
      </video>
      <div style={styles.grid} />
      <div style={styles.overlay} />
      <div style={styles.glow} />

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>SYSTEM DASHBOARD</h1>
          <div style={styles.status}>● ONLINE</div>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoRow}>
            <span style={styles.label}>OPERATIVE ID</span>
            <span style={styles.value}>{user.email}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>PHYSIQUE PROTOCOL</span>
            <span style={styles.value}>{user.physique?.toUpperCase() || "NOT CALIBRATED"}</span>
          </div>
        </div>

        <div style={styles.statsGrid}>
          {[
            { label: "WEIGHT", value: `${user.stats?.weight || "--"} kg` },
            { label: "HEIGHT", value: `${user.stats?.height || "--"} cm` },
            { label: "AGE", value: user.stats?.age || "--" },
            { label: "BODY FAT", value: `${user.stats?.bodyFat || "--"}%` },
            { label: "BMI", value: stats.bmi },
            { label: "STATUS", value: stats.bmiStatus },
            { label: "BMR", value: stats.bmr },
            { label: "TARGET KCAL", value: stats.targetCalories },
          ].map((stat, i) => (
            <div key={i} style={styles.statItem}>
              <div style={styles.statLabel}>{stat.label}</div>
              <div style={styles.statValue}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={styles.workoutSection}>
          <h2 style={styles.sectionTitle}>
            TODAY'S PROTOCOL — {today}
          </h2>

          <div style={styles.exerciseList}>
            {currentExercises.length > 0 ? (
              currentExercises.map((ex, i) => (
                <div key={i} style={styles.exerciseItem}>
                  <span style={styles.exerciseNumber}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{ex}</span>
                </div>
              ))
            ) : (
              <div style={styles.noPlan}>
                Generating today's protocol...
              </div>
            )}
          </div>

          {currentExercises.length > 0 && (
           <button
  style={{
    ...styles.button,
    background: completing
      ? "linear-gradient(135deg, #334155, #1e293b)"
      : "linear-gradient(135deg, #7d8a86, #000202)",
    borderColor: completing ? "#64748b" : "#00f5ff",
    boxShadow: completing
      ? "0 0 20px rgba(100,116,139,0.4)"
      : "0 0 15px #00f5ff, 0 0 40px rgba(0,245,255,0.5)",
    transform: completing ? "scale(0.98)" : "scale(1)",
    marginTop: "24px",
  }}
  onClick={completeWorkout}
  disabled={completing}
  onMouseEnter={(e) => {
    if (!completing) {
      e.target.style.transform = "translateY(-4px) scale(1.03)";
      e.target.style.boxShadow =
        "0 0 25px #00f5ff, 0 0 60px rgba(0,245,255,0.8)";
    }
  }}
  onMouseLeave={(e) => {
    if (!completing) {
      e.target.style.transform = "translateY(0px) scale(1)";
      e.target.style.boxShadow =
        "0 0 15px #00f5ff, 0 0 40px rgba(0,245,255,0.5)";
    }
  }}
>
  {completing
    ? " SAVING NEW PROTOCOL..."
    : " DONE FOR TODAY → NEW SESSION"}
</button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  loadingContainer: {
    height: "100vh",
    background: "#05040f",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#67e8f9",
    fontFamily: "system-ui, Arial, sans-serif",
    gap: "20px",
  },
  errorText: {
    fontSize: "18px",
    color: "#f87171",
    textAlign: "center",
  },
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
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(103,232,249,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.08) 1px, transparent 1px)`,
    backgroundSize: "50px 50px",
    opacity: 0.6,
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at center, transparent 40%, rgba(5,4,15,0.85) 80%)",
    zIndex: 2,
  },
  glow: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "720px",
    height: "720px",
    background: "rgba(103,232,249,0.15)",
    borderRadius: "50%",
    filter: "blur(140px)",
    zIndex: 1,
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    background: "rgba(10,10,20,0.92)",
    border: "1px solid rgba(103,232,249,0.35)",
    borderRadius: "24px",
    padding: "40px 32px",
    zIndex: 3,
    boxShadow: "0 0 60px rgba(103,232,249,0.15)",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", borderBottom: "1px solid rgba(103,232,249,0.2)", paddingBottom: "20px" },
  title: { fontSize: "32px", fontWeight: "900", letterSpacing: "-1px" },
  status: { color: "#34d399", fontSize: "14px", letterSpacing: "2px" },
  infoSection: { marginBottom: "35px" },
  infoRow: { display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  label: { color: "#67e8f9", fontSize: "13px", letterSpacing: "1px" },
  value: { color: "#e0f2fe", fontWeight: "500" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", marginBottom: "35px" },
  statItem: { padding: "14px", borderRadius: "12px", background: "rgba(0,0,0,0.45)", border: "1px solid rgba(103,232,249,0.1)" },
  statLabel: { fontSize: "11px", color: "#67e8f9", marginBottom: "4px", letterSpacing: "1px" },
  statValue: { fontSize: "22px", fontWeight: "bold", color: "#e0f2fe" },
  workoutSection: { marginBottom: "32px" },
  sectionTitle: { textAlign: "center", color: "#67e8f9", fontSize: "15px", letterSpacing: "3px", marginBottom: "16px", textTransform: "uppercase" },
  exerciseList: { display: "flex", flexDirection: "column", gap: "10px" },
  exerciseItem: { display: "flex", gap: "18px", padding: "16px 18px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px solid rgba(103,232,249,0.1)", fontSize: "15px" },
  exerciseNumber: { color: "#67e8f9", fontWeight: "bold", minWidth: "28px" },
  noPlan: { textAlign: "center", color: "#888", padding: "20px", fontStyle: "italic" },
button: {
  width: "100%",
  padding: "18px",
  border: "2px solid #000000",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "900",
  letterSpacing: "2px",
  borderRadius: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  position: "relative",
  overflow: "hidden",
}
};

export default Final;
