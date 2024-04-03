import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"

//configure env
 dotenv.config({path:"./.env"})

 //database config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/",(req,res)=>{
    res.send({
        message:"Welcome to ecommerce app"
    })
});

//PORT
const PORT= process.env.PORT  ;

//run listen
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})