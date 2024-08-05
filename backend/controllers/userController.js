import bcrypt from "bcrypt";
import userSchema from "../models/userModel.js";
import validator from 'validator'
import jwt from 'jsonwebtoken'


//Register user 

const registerUser = async(req,res) => {

    const {username,email,password,role} = req.body;
    try {
        const existUser = await userSchema.findOne({where: {
            email: email  
          }});

        if(existUser){
            return res.json({success:false, message: "User already exist"})
        }

        //validating email and password

        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message: "Please enter a strong password"})
        }
        
        //hashed password
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await userSchema.create({
            username,
            email,
            password:hashedPassword,
            role: role || 'user'
        });
        const token = createToken();
        res.json({success:true,message: "user registered successfully",user: newUser,token});
    } catch (error) {
        console.error('Error registering user:', error);
        res.json({ message: 'Server error' });
        
    }
}

//Login user 

const loginUser = async(req,res) => {

    const {email,password} = req.body;

    try {
        const user = await userSchema.findOne({where: {
            email: email  
          }});

        if(!user){
            return res.json({success:false, message:"User Doesn't Exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message: "Invalid Credentials"})
        }

        const token  = createToken(user);
        res.json({success:true,message:"login succesfully",token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }

}

const createToken = (user) => {
    return jwt.sign({id:user.user_id,role: user.role,},process.env.JSONSECRETKEY, { expiresIn: '1h' });
}

export {registerUser,loginUser};