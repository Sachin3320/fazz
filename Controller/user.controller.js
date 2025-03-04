// /controllers/userController.js
import bcrypt from 'bcryptjs';
import User from '../model/user.schema.js';
import { asyncHandler } from '../middleware/ErrorHandler/asyncHandler.js';  
 
import { generateJWT, sendTokenInCookie } from '../utils/generateJwtToken.js';
import errorResponse from '../middleware/ErrorHandler/errorResponse.js';
import { sendEmail } from '../utils/sendEmail.js';
import OtpSchema from '../model/otp.schema.js';


//Signup controller 
export const signup = asyncHandler(async (req, res, next) => {

  const { name, email, password, confirmPassword , otp} = req.body;
  


  if (!name || !email || !password || !confirmPassword) {
    return next(new errorResponse('Please provide all fields (name, email, password, confirmPassword)', 400));
  }

  if (password !== confirmPassword) {
    return next(new errorResponse('Passwords do not match', 400));
  }

  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return next(new errorResponse('User already exists with this email', 400));
  }

  const isVerified = await verifyOtp(email , otp )
  console.log("reacher0")
  console.log(otp)
    
  if (!isVerified){
   return  res.status(404).json({message : "Invalid Otp please try again or resend otp"})
  }
 console.log("reacher")
  //------------------------------------------------------
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    EmailVerification: 'active'
});

  res.status(201).json({
    status: 'success',
    message: 'User created successfully' ,
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    },
  });
});



//otp Send 
export const SendOtp = asyncHandler(async (req, res, next) => {
    const {email} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiryDate = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
    const user = await OtpSchema.findOne({ email });
    if (user) {
        user.otpNumber = otp;
        user.otpExpiryDate = otpExpiryDate;
        await user.save();
        await sendEmail({ email, otp });
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    const newUser = await OtpSchema.create({
        email,
        otpNumber: otp,
        otpExpiryDate: otpExpiryDate,
        status: 'active',
    });
    await sendEmail({ email, otp });
    res.status(200).json({ message: 'OTP sent successfully' });
    
})




//Login controller
export const Login = asyncHandler(async (req, res, next) => { 
   
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400));
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    const token = generateJWT(user);
    sendTokenInCookie(res, token);

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data:  user
      
     
})
})



//logout controller
export const Logout =  asyncHandler(async (req, res, next) => {
    
      
        res.clearCookie('jwt', {
          httpOnly: true,          
          secure: process.env.NODE_ENV === 'production',  
          sameSite: 'Strict',      
        });
      
       
        return res.status(200).json({ message: 'Logged out successfully' });
      
    })


//otpVerification 
const verifyOtp = async(email , otp )=>{
    
    const user = await OtpSchema.findOne({ email });
    if (!user) {
        return false
    }
    if(user.count >3){
        return false
    }
    if (user.otpNumber !== otp) {
        return false
    }
    if (user.otpExpiryDate < Date.now()) {
        return false
    }
    if(user.otpNumber == otp ){
    user.status = 'active';
    await user.save();
    return true ;
}
    
}

