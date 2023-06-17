import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTKEY;
const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded)
    }
    next();
  } catch (error) {
    console.log(error,"token expiredd");
    res.status(404).json({ message:"token expired" });

  }
};

export default authMiddleWare;
