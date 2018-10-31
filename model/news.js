const mongoose = require("mongoose")
const news = new mongoose.Schema({
  author:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "adminuser"
  },
  type:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "catetories"
  },
  looknum:Number,
  title:String,
  content:String,
  contentText:String,
  img:String
},
{
    versionKey:false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }

})
module.exports=mongoose.model("news",news)
