import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"

// login user

const loginUser = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User not found!"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Incorrect password!"});
        }
        const token = createToken(user._id);
        res.json({success: true, message: "Logged in successfully!", token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to login!"});
    }
}

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// register user
const registerUser = async(req, res)=>{
    const {name, password, email} = req.body;
    try{
        const exists = await userModel.findOne({email});
        //check user exists
        if(exists) {
            return res.json({success: false, message: "Email already exists!"});
        }
        //validate password and email
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Invalid email!"});
        }

        //validate password length 
        if(password.length < 8){
            return res.json({success: false, message: "Password must be at least 8 characters long!"});
        }
        //hashing user password
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword});
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success: true, message: "User registered successfully!", token});

    } catch(error){
        console.log(error);
        res.json({success: false, message: "Failed to register!"});
    }

};

export { loginUser, registerUser}