import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import trainRouter from "./routes/trainRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4004;

app.use(express.json());
app.use(cors());

// api endpoints

app.use("/api", userRouter);
app.use("/api/trains", trainRouter);
app.use("/api/trains", bookingRouter);

app.get("/", (req, res) => {
  res.send("API Working...");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));
