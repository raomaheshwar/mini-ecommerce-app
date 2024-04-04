import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async(req, res)=>{
    try {
        const {name, email, password, phone, address} = req.body;

        //validation
        if(!name){
            return res.send({error:"Name is required"});
        }
        if(!email){
            return res.send({error:"Email is required"});
        }
        if(!password){
            return res.send({error:"Password is required"});
        }
        if(!phone){
            return res.send({error:"Phone number is required"});
        }
        if(!address){
            return res.send({error:"Address is required"});
        }

        //check user
        const existingUser = await userModels.findOne({email});

        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"Already Register please login"
            })
        }

        //register user
        const hashedPassword= await hashPassword(password)
        //save
        const user = await new userModels({name,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error
        })
    }
};

//POST LOGIN
export const loginController= async(req,res)=>{
    try {
        const {email, password}= req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            });
        }
        //check user
        const user = await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registerd"
            });
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            });
        }
        //Token
        const token= await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success: true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
}

//test controller
export const testController=()=>{
   res.send("Protected Routes")
}