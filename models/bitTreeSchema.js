import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    links:[{
        linkText:{
            type:String,
        required:true
        },
        linkUrl:{
            type:String,
            required:true
        }
    }
    ],

    imageurl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.models.User || mongoose.model("User",userSchema);
