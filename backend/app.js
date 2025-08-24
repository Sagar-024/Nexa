
import express from 'express'
import cors from 'cors'
import connect from './Db/connect.js'
import dotenv from 'dotenv'


//routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import recommendationRoutes from './routes/recommendRoutes.js';

//start express 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recommendations", recommendationRoutes)



const start = async () => {
  try {
    await connect(process.env.CONNECTION_STRING)
    app.listen(PORT, () =>
      console.log(`Server is listening on port http://localhost:${PORT}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();