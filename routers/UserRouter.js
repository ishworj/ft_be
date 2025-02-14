import express from "express";
import { createUser, getUserbyEmail } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
const router = express.Router();

// User signup
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    console.log(req.body.password);
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
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error collection")) {
      msg = "Email already in use, please try another email";
    }
    res.json({
      status: "error",
      message: msg,
    });
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

          user.password=undefined;
          return res.json({
            status: "success",
            message:"logged in successfullt",
            user
          });
        }
      }
    }

    return res.status(401).json({
      status: "error",
      message: "invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// user Profile

export default router;
