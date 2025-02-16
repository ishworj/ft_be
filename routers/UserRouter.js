import express from "express";
import { createUser, getUserbyEmail } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { jwtSign } from "../utils/jwt.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();

// User signup
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await createUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created, you may login now",
        })
      : res.json({
          status: "error",
          message: "Error creating user. Please try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already in use, please try another email";
    }
    error.statusCode = 200;
    next(error)
  }
});

// User Login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await getUserbyEmail(email);
      if (user?._id) {
        const isMatched = comparePassword(password, user.password);

        if (isMatched) {
          const accessJWT = jwtSign({ email });
          user.password = undefined;
          return res.json({
            status: "success",
            accessJWT,
            message: "logged in successfullt",
            user,
          });
        }
      }
    }

    return res.status(401).json({
      status: "error",
      message: "invalid email or password",
    });
  } catch (error) {
    next(error)
  }
});

// user Profile
router.get("/", authenticate, (req, res, next) => {
  try {
    let user = req.userData;
    user.password=undefined;
    return res.json({
      status: "success",
      message: "here is user profile",
      user
    });
  } catch (error) {
    next(error)
  }
});

export default router;
