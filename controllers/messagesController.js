const messageModel = require("../model/messageModel.js");

//This route add new message in database
module.exports.addMessage = async (req,res,next) => {
    try{
        //we can only get that parameteres from req.body which we have posted in our frontend
        const {from,to,message} = req.body;//get from,to,message from frontend
        const data = await messageModel.create({//create new mongoose model
            message:{text:message},//define text inside message to be message
            users: [from,to],//define user from and to//as users is array we use [from,to]
            sender: from,//as from is our sender
        });
        if(data) return res.json({msg:"Message added Succesfully."});//if data is true that means message is added successfully to database
        else return res.json({msg:"Failed to add message to the database."});//else
    }catch(ex){
        next(ex);//ef any exception
    }
};


//This route return an array of objects which contain field fromSelf and message
module.exports.getAllMessage = async (req,res,next) => {
    try{
        const {from,to} = req.body;//get from and to from fontend body
        const messages = await messageModel.find({//find all users with [from,to] value sameas our [from,to]
            //we have togetall the users as every timeour new message is added we have added new from and to
            //in the database and not the new message is added to same from and to which is the prev one
            //even if our from and to is same as previous one
            //so our database contains multiple from and to with same id each for every new message sent
            //so getting that all samefrom and to and sorting on the basis of first sent msg
            users: {
                $all: [from,to],
            },
        }).sort({updatedAt:1});//sort messages on the basis of first creted message
        //.sort() function dont take strings it either take string or object 
        //we can also use "asc" or "ascending" instead of 1
        const projectMessages = messages.map((msg) => {//map all the messages
            return{
                //As sender is of tpe ObjectId we have to convert it to string as from is of type string 
                fromSelf:msg.sender.toString() === from,//if sender=from so true else false
                message:msg.message.text,
            };
        });
        res.json(projectMessages);//return projectMessage swhich contains all the messages between 2 users
    }catch(ex){
        next(ex);//if any exception
    }
};