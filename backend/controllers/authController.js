
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from '../Db/model/User.js'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { credential } = req.body; 
  try {
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

   
    let user = await User.findOne({ email: payload.email });

    
    if (!user) {
      user = await User.create({
        email: payload.email,
        name: payload.name,
        googleId: payload.sub,  
      });
    } else {
     
      if (user.name !== payload.name) {
        user.name = payload.name;
        await user.save();
      }
    }

    
    const myJwt = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Respond with JWT and user info
    res.json({
      token: myJwt,
      user: { id: user._id, email: user.email, name: user.name },
      isNew: !user.createdAt 
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Google authentication failed" });
  }
};
