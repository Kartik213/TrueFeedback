// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/user.js";

// dotenv.config();
// const app = express();

// app.use(cookieParser());
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// // app.use(cors());
// app.use(cors({
// 	origin: 'http://localhost:5173',
// 	credentials: true
// }));

// app.use("/auth", authRoutes);
// app.use("/user", userRoutes);

// const PORT = process.env.PORT || 6001;
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server port ${PORT}`));
//   })
//   .catch((err) => {
//     console.log(err);
//   });


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.set('port', (process.env.PORT || 8081));

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://your-frontend.vercel.app", // Update with your frontend URL
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get('/api/testing', (req, res) => {
  res.status(200).json({message: "Running"})
})

console.log("MONGO_URL:", process.env.MONGO_URL);

// Connect to MongoDB (Ensure MONGO_URL is set in Vercel environment variables)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(app.get('port'), function() {
  console.log('Express app vercel-express-react-demo is running on port', app.get('port'));
});

// Export the app for Vercel
export default app;
