const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes.js");
const messagesRoute = require("./routes/messagesRoute.js");
const socket = require("socket.io");
const path = require('path');

const app = express();//creating app by calling express func
require("dotenv").config();

app.use(express.json());//use express
app.use(cors());

//"http://localhost:5000/api/auth" use this link to access any userRout
//"http://localhost:5000/api/messages" use this link to access any messagesRoute
//we have to add particular route in this link to access that route
app.use("/api/auth",userRoutes);
app.use("/api/messages",messagesRoute);

// serve static file
app.use(express.static(path.join(__dirname, './../public/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './../public/build/index.html'));
  });

mongoose.connect("mongodb+srv://jainn098421:jainn098421@cluster0.gw7jcy5.mongodb.net/?retryWrites=true&w=majority",{//Server setup
    //useUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{//If successful
    console.log("DB Connection Succesful");
}).catch((err)=>{//else output the error
    console.log(err.message);
});

const server = app.listen(5000,() =>{//start port
    console.log(`Server Started on Port 5000`);
});
// app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
const io = socket(server,{
    cors:{
        origin:"*",
        // origin:"http://localhost:3000",
        credentials:true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        // optionsSuccessStatus: 200,
    },
})

global.onlineUsers = new Map();

//the socket.io("connection") function establishes a connection with the React app
io.on("connection",(socket)=> {//we had connection
    global.chatSocket = socket;//whenever there is connection we save chatsocket inside global chatsocket
    //emit "add-user" by frontend
    //here {userId} is provided in frontend and we detructure it in backend
    socket.on("add-user",(userId)=>{//whenever user is loggedin we establish socket connection by add-user
        onlineUsers.set(userId,socket.id);//we will grab userId and current socket id and we set it inside map
    });
    //whenever "send-msg" socket emmited we have paased data inside it
    //(data) is provided in frontend inside "send-msg" socket
    socket.on("send-msg",(data)=> {//data will contain "to" and "msg" inside it as we have defined 
        //"to" and "msg" in "send-msg" in frontend 
        const sendUserSocket = onlineUsers.get(data.to);//we check if the user to which message to be sent is online or not
        if(sendUserSocket){//if the user is online
            //.to(sendUserSocket) is used to send emmitted message to sendUserSocket
            //.to({contains the userId to which msg to be sended if the reciver is one otherwise contain roomnamein case of multiple user}) 
            socket.to(sendUserSocket).emit("msg-recieve",data.message);//emit the message to user by "msg-recieve" event
        }
        //if the user is not online msg is stored in database and if he is online it will be recieved by him as well as stored in database
    })
})

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);