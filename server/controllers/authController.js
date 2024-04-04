import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async(req, res)=>{
    try {
        const {name, email, password, phone, address, answer} = req.body;

        //validation
        if(!name){
            return res.send({message:"Name is required"});
        }
        if(!email){
            return res.send({message:"Email is required"});
        }
        if(!password){
            return res.send({message:"Password is required"});
        }
        if(!phone){
            return res.send({message:"Phone number is required"});
        }
        if(!address){
            return res.send({message:"Address is required"});
        }
        if(!answer){
            return res.send({message:"Answer is required"});
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
        const user = await new userModels({name,email,phone,address,password:hashedPassword,answer}).save()

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
                role:user.role
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
//forgotPasswordController
export const forgotPasswordController= async(req, res)=>{
   try {
       const {email, answer, newPassword} = req.body;
       if(!email){
        res.status(400).send({
            message:"Email is required"
        })
       }
       if(!answer){
        res.status(400).send({
            message:"Answer is required"
        })
       }
       if(!newPassword){
        res.status(400).send({
            message:"NePassword is required"
        })
       }
       //check
       const user = await userModels.findOne({email,answer})
       //validation
       if(!user){
        return res.status(404).send({
            success:false,
            message:"Wrong email or Answer"
        })
       }
       const hashed = await hashPassword(newPassword);
       await userModel.findByIdAndUpdate(user._id, { password: hashed });
       res.status(200).send({
         success: true,
         message: "Password Reset Successfully",
       });
   } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Somethng went wrong",
        error
      })
   }
};


//test controller
export const testController=()=>{
   res.send("Protected Routes")
}