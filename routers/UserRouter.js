import express from "express";
import { createUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcryptjs.js";
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
      msg="Email already in use, please try another email"
    }
    res.json({
      status: "error",
      message: msg
    });
  }
});

// User Login

// user Profile

export default router;
