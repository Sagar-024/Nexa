import User from "../models/User.js";
import bcrypt from "bcryptjs";


 const getMe = async (req, res) => {

  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    createdAt: req.user.createdAt,
  });
};


export const updateMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = req.body.name || user.name;
    // For password update: hash the new pass
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    await user.save();
    res.json({ msg: "Profile updated", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
};
