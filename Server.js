//Dependencies 
import express from "express" 
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"

//Import Statements
import { connectDB } from "./db.connect/db.connect.js"
import {errorHandler} from "./middleware/ErrorHandler/globalErrorHandler.js"
import UserRoute from "./Routes/user.routes.js"



//config
dotenv.config()

//middlewares
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

app.use(errorHandler); //globalErrorHandler


//Server Setup
const port =  process.env.PORT|| 5000

app.get("/",(req,res)=>{
    return res.send("hello")
})
app.use("/api" ,UserRoute)

 
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}/ on port ${port}`);
         connectDB();  // Ensure DB connection is established
    });
   


