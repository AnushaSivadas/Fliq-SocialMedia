import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";

dotenv.config();
const secret = process.env.JWTKEY;
const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, secret);

      req.body._id = decoded?.id;
      // const user = await UserModel.findById(decoded?.id);
      // if (user && user.isBlocked) {

      //   res.setHeader('X-Blocked-User', 'true');
      //   console.log("auth",res.setHeader)
      //   return res.status(401).json({ message: "User is blocked and logged out" });

      // }
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;
