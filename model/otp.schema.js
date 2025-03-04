import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    otpNumber:{
    type:String,
    required:true

    },
    otpExpiryDate:{
        type:Date,
        required:true
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'expired'],
        default: 'pending',
      },
    count:{
        type:Number,
        default:0,
    }
})
const OtpSchema = mongoose.model('Otp', otpSchema);
export default OtpSchema