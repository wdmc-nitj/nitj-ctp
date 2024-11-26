const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        link: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            default: true
        },
        year:{
            type:Number,
            required:true
        },
        statsType:{
            type: String,
            required: true,
        },
        course:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

//Model---------------------------->
const Model = mongoose.model("placement_stats", Schema);

//Export----------------------------->
module.exports = Model;

