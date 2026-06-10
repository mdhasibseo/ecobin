const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet =
  require("helmet");

const connectDB =
  require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/waste", require("./routes/wasteRoutes"));

app.use(
  "/api/redeem",
  require("./routes/redeemRoutes")
);

const path = require("path");
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.use(
  "/api/leaderboard",
  require("./routes/leaderboardRoutes")
);



app.get("/", (req, res) => {
  res.send(
    "Smart Recycling API Running"
  );
});


const {
  notFound,
  errorHandler,
} = require(
  "./middleware/errorMiddleware"
);
app.use(helmet());
app.use(notFound);
app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

console.log(
  process.env.GEMINI_API_KEY
);