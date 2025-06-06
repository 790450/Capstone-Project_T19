import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
  console.log("Body received:", req.body);

  const { username, email, password } = req.body;

  if (
    !username || 
    !email || 
    !password ||
     username === "" || 
     email === "" || 
     password === ""
    ) {
     return next(errorHandler(400, "All fields are required"))
    }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error)
  }
};


const isProduction = process.env.NODE_ENV === 'production';

export const signin = async (req, res, next) =>{
  const {email, password} = req.body

  if (
    !email || 
    !password ||
    email === "" || 
    password === ""
    ) {
     return next(errorHandler(400, "All fields are required"))
    }

    try {
      const validUser = await User.findOne({ email })

       if(!validUser){
         return next(errorHandler(404, "User not found"))
       }

       const validPassword = bcryptjs.compareSync(password, validUser.password)

        if(!validPassword){
         return next(errorHandler(400, "invalid credentials"))
       }

       const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d',});

       const {password: pass, ...rest} = validUser._doc

       res.status(200).cookie("access_token", token, {
        httpOnly: true,
        secure: isProduction,          
        sameSite: isProduction ? "none" : "lax",  
        maxAge: 24 * 60 * 60 * 1000   
      })
      .json({
        ...rest,
        token,
      });

    } catch (error) {
      next(error)
    }

}

export const google = async(req,res, next) =>{
  const{email, name, profilePhotoUrl} = req.body

  try {
     const user = await User.findOne({ email })

     if(user){
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d',});
        const {password: pass, ...rest} = user._doc

        return res.status(200).cookie("access_token", token,{
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
          maxAge: 24 * 60 * 60 * 1000
        })
        .json({
          ...rest,
          token,
        });
    }

      const generatedPassword =
       Math.random().toString(36).slice(-8)+
       Math.random().toString(36).slice(-8)

       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

       const newUser  = new User({
          username: name.toLowerCase().split(" ").join("")+
           Math.random().toString(9).slice(-4),
           email,
           password: hashedPassword,
           profilePicture: profilePhotoUrl,
       })

       await newUser.save()
       const token = jwt.sign({id: newUser._id, isAdmin:newUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d',});
        const {password: pass, ...rest} = newUser._doc
        return res.status(200).cookie("access_token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000
      })
      .json(rest);
  } catch (error) {
    next(error)
  }
}
