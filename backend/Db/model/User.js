import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the user'],
      trim: true,
    },
    gmail: {
      type: String,
      unique: true,
      required: [true, 'Please provide the Gmail of the user'],
      lowercase: true,
      trim: true,
    },
    pasword:{
       type: String,
    },
    googleId:{
      type:String 
    }
  },
  { timestamps: true }
)

export default model('User', userSchema)