const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        question: {
            type: String,
        },
        answer: {
            type: String,
        },
        related: {
            type: String,
        },
        name:{
            type: String,
        },
        email:{
            type: String,
        },
        phone:{
            type: String,
        },
        insiderOutsider:{
            type: String,
        },
        rollNumber:{
            type:String,
        },
        state:{
            type:String,
            default:"pending",
        }
    },
);

//Model---------------------------->
const Model = mongoose.model("Query", Schema);

//Export----------------------------->
module.exports = Model;

