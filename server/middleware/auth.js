import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decoded) => {
      if (err){
        return res.status(401).json({ message: "Forbidden" });
      }
      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
