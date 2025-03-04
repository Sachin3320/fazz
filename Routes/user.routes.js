import express from 'express'
import { Login, Logout, SendOtp, signup } from '../Controller/user.controller.js'


const UserRoute = express.Router() 


UserRoute.post("/Signup" ,signup )
UserRoute.post("/Login" ,Login )
UserRoute.post("/Logout" ,Logout )
UserRoute.post("/sendOtp" , SendOtp)
export default UserRoute;