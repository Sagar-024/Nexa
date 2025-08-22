import jwt from "jsonwebtoken";
import User from "../Db/model/User.js";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }
  res.status(401).json({ error: "Not authorized, no token" });
};
export default protect