const mongoose = require("mongoose");
// const { stringify } = require("querystring");
const messageSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required:true,
        },
    },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,//Will contain id to that particular user//it is used for unique identifier
            ref:"User",
            required:true,
        },
    },
    {
        timestamps:true,//if new chat is addede mongoose will add timestamp
    }
);

module.exports = mongoose.model("Messages",messageSchema);