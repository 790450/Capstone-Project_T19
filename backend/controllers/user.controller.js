import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const updateUser = async(req, res, next) => {


   if(req.user.id !== req.params.userId){
    return next(errorHandler(403, "You can only update your own account!!"))
   }

   if(req.body.password){
    if(req.body.password.length < 8){
        return next(errorHandler(400, "Password must be atleast 8 characters"))
    }

    req.body.password = bcryptjs.hashSync(req.body.password, 10)
   }

   if(req.body.username){
    if(req.body.username.length < 5 ||  req.body.username.length > 20){
        return next(errorHandler(400, "Username must be between  5 and 20 characters"))
    }

    if(req.body.username.includes(" ")){
        return next(errorHandler(400, "username cannot contain spaces"))
    }


    if(req.body.username !== req.body.username.toLowerCase()){
        req.body.username = req.body.username.toLowerCase()
    }

    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
       return next(errorHandler(400, "Username can only conatains letters and numbers"))
    }

   }

   if (req.body.profilePicture && typeof req.body.profilePicture === "object") {
    req.body.profilePicture = req.body.profilePicture.$id || null;
  }



   try {
     const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
        $set:{
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password

        },
     },{new: true}
    )

    const{password: pass,...rest} = updatedUser._doc 

    res.status(200).json(rest)
    
   } catch (error) {
     next(error)
   }
}

 export const deleteUser = async(req, res, next) =>{

      if(req.user.id !== req.params.userId){
    return next(errorHandler(403, "You can only update your own account!!"))
   }

   try {
     await User.findByIdAndDelete(req.params.userId)

     res.status(200).json("User has been deleted!")
   } catch (error) {
    next(error)
   }

 }

 export const signout = async(req, res, next) =>{
   try {
     res.clearCookie("access_token").status(200).json("User has been loggedout successfully!")
   } catch (error) {
     next(error)
   }
 }