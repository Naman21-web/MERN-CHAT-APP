const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { isSet } = require("util/types");

module.exports.register = async (req,res,next) => {
    try{
    //Will get details from frontend which we filled 
    const {username,email,password} = req.body;//take username,password and email from body
    const usernameCheck = await  User.findOne({username });//find username in our mongoose database
    if(usernameCheck)//if username exists
        return res.json({msg:"Username already used", status:false});
    const emailCheck = await User.findOne({email});//find email
    if(emailCheck)//if email exists
        return res.json({msg:"Email already used", status:false});
    const hashedpassword = await bcrypt.hash(password,10);//for hashing the password
    const user = await User.create({//if all are correct i.e., username and password
        //we want to provide email as email and username as username
        //thatswhy we wrote it once
        //If we want to provide something else in username field of the mongoose schema we will write it
        //like we have written in password
        //We dont want to store the same password which the user provided
        //So we provided hashedpassword in password field of the schema
        //We have used hashed password because of the security
        email,
        // username:username, instead of writing like this we can only write it once as both are same
        username,
        password:hashedpassword,
    });
    delete user.password;//as we inserted encrypted password so deleting original password
    return res.json({status:true,user});//send this in the frontend we get this in {data} in frontend
    }catch(ex){
        next(ex);
    }
};

module.exports.checkUsername = async(req,res,next) => {
    try{
        const {username} = req.body;
        const user=await User.findOne({username});
        if(user){
            return res.json({status:false,msg:"Username unavailable"});
        }
        else{
            res.json({status:true,msg:"Username Available"});
        }
    }catch(ex){
        next(ex);
    }
}

module.exports.firebaseLogin = async(req,res,next) => {
    try{
        const {email} = req.body;
        // console.log(email);
        // if(email){
            const user = await User.findOne({email});
            if(user){
                delete user.password;
                return res.json({status:true,user});
            }else{
                return res.json({status:false,msg:"Email not found in database,welcome new user",});
            }
        // }
    }catch(err){
        next(err);
    }
}

module.exports.login = async (req,res,next) => {
    try{
    //we have provided this when we have used this route
    const {username,password} = req.body;//request it//et it from the frontend 
    const user = await User.findOne({ username });//find username 
    if(!user)//If it doesnt exist
        //we get this response in the data feild in the frontend
        //We have destructured the data feild in frontend and check status which we provided here, in thr frontend
        return res.json({msg:"Incorrect Username or password", status:false});
    const isPasswordValid = await bcrypt.compare(password, user.password);//as password is encrypted
    if(!isPasswordValid)
        return res.json({msg:"Incorrect Username or password", status:false});
    delete user.password;//of correct delete 
    return res.json({status:true,user});//if correct details provide user in the frontend and status true
    }catch(ex){
        next(ex);
    }
};

module.exports.setAvatar = async (req,res,next) => {
    try{
        //req.params is used when we want something from link
        //like in setAvatar route link we have use "/:id" and that id will be provided in frontend
        //So to get that id we use req.params and we want id in it so we use req.params.id
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage,
        })
    }catch(ex){
        next(ex);
    }
};

module.exports.getAllUsers = async (req,res,next) => {
    try{
        //find by id
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",//because it also contain password and we dont want to send password so use .select()
            //this to select some specific things to be sended
        ]);
        return res.json(users); 
    }catch(er){
        next(er);
    }
}