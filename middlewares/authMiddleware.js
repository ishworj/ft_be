import { getUserbyEmail } from "../models/user/UserModel.js";
import { jwtVerify } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedData = await jwtVerify(token);
    if (decodedData?.email) {
      const userData = await getUserbyEmail(decodedData.email);
      if (userData?._id) {
        req.userData = userData;
        return next();
      }
    }
    res.status(403).json({
      status: "error",
      message: "Unauthorized",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
