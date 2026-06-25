const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongo = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.Mongo_url)
  .then(() => {
    console.log(" MongoDB Connected");
  })
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err.message);
  });

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    physique: {
      type: String,
      default: "",
    },
    stats: {
      weight: {
        type: String,
        default: "",
      },
      bodyFat: {
        type: String,
        default: "",
      },
      height: {
        type: String,
        default: "",
      },
      age: {
        type: String,
        default: "",
      },
      gender: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);


app.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email.toLowerCase(),
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        email: user.email,
        physique: user.physique,
        stats: user.stats,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


app.get("/", (req, res) => {
  res.send("Gym Tracker Backend Running");
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Registration successful",
    });
  } catch (err) {
    console.error("Register Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.json({
      success: true,
      user: {
        email: user.email,
        physique: user.physique,
        stats: user.stats,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.post("/save-stats", async (req, res) => {
  try {
    const {
      email,
      weight,
      bodyFat,
      height,
      age,
      gender,
    } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    user.stats = {
      weight,
      bodyFat,
      height,
      age,
      gender,
    };

    await user.save();

    res.json({
      success: true,
      message: "Stats saved",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
app.post("/physique", async (req, res) => {
  try {
    const { email, physique } = req.body;

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { physique: physique },
      { new: true }
    );

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
app.patch('/user/:email/daily-workout', async (req, res) => {
  const { dailyWorkout } = req.body;

  const updated = await User.findOneAndUpdate(
    { email: req.params.email },
    { $set: { dailyWorkout } },
    { new: true }
  );
  res.json({ success: true, user: updated });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
