const mongoose =require ("mongoose")
const catetory=new mongoose.Schema({
        catetory:{
            type:String,
            required:true,
        }
    },
    { versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt:"updated_at"  
}})
module.exports=mongoose.model("catetories",catetory)//集合名，骨架名