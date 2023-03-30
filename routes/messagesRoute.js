const { addMessage, getAllMessage } = require("../controllers/messagesController.js");

const router = require("express").Router();

//To use addMessage route use this link
//http://localhost:5000 //port link
// "api/messages" //link to use messageRoute
// "/addmsg" //to use addmessage route
// "http://localhost:5000/api/messages/addmsg"
router.post("/addmsg/",addMessage);

//To use getAllMessage route use this link
// "http://localhost:5000/api/messages/getmsg"
router.post("/getmsg/",getAllMessage);

module.exports = router;