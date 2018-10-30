const mongoose = require ("mongoose")
const adminUser = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    nickname:String,
    avatar: String,
    desc: String,
    job:String,
    phone:String,
    sex:String,
    },{versionKey:false,timestamps:{createdAt:"createTime",updatedAt:"updateTime"}
})
module.exports=mongoose.model("adminuser",adminUser)