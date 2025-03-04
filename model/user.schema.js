import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    contactNumber: {
        type: String,    
      },
      
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],  
      default: "user",
    },
    EmailVerification: {
      type: String,
      enum: ['pending', 'active', 'inactive'],
      default: 'pending',
    },
   

   
  },
  { timestamps: true } 
);
const User = mongoose.model("User", userSchema);

export default User;
