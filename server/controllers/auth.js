import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, url } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const usernameExist = await User.findOne({username});
    if(usernameExist){
      return res.status(204).json({message: "Username already taken"});
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(204).json({ message: "Email already in use" });
    }

    const completeUrl = `${url}/u/${username}`;

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      url: completeUrl,
      acceptMessages:false,
    });
    const savedUser = await newUser.save();
    res.status(201).json({message: "User registered successfully"});
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email/username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      {
          _id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
 
    const expiresIn = 7 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(Date.now() + expiresIn);
    res.cookie("jwt", refreshToken, {
      // httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      expires: expiryDate, //cookie expiry: set to match rT
    });

    delete user.password;
    res.status(201).json({ accessToken, username: user.username, message: "Signin Successful"});
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const refresh = (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(400).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const foundUser = await User.findById(decoded._id);

        if (!foundUser)
          return res.status(403).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
          {
              _id: foundUser._id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );

        res.json({ accessToken, username: foundUser.username });
      }
    );
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    // res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    res.clearCookie("jwt", { sameSite: "None", secure: true });
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
