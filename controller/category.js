const express = require("express")
const router = express.Router()
const catetoryModel = require("../model/category")
const auth = require("./auth");


//添加新闻分类
router.post("/addcategory",auth,(req,res,next)=>{
    let {catetory}=req.body
    if(catetory){
        catetoryModel.create({
            catetory
        }).then(data=>{
            res.json({
                code:200,
                msg:"创建分类成功",
                data,
            })           
        }).catch(err=>{
            next(err)
        })
    }else{
        res.json({
            code:401,
            msg:"缺少必要参数"
        })
    }
   
})

// 获取分类列表
router.get('/categoryList',auth,(req,res,next)=>{
    let count = 0
    catetoryModel.count().then(res => {
        count = res
    })
    // console.log(count)
    let {pn=1,size=10} = req.query
    pn=parseInt(pn)
    size=parseInt(size)
   
    catetoryModel.find().skip((pn-1)*size).limit(size).then(data=>{
            res.json({
                code:200,
                msg:"获取管理员列表成功",
                data,
                count:count
            })
        }).catch(err=>{
            next(err)
        })
   
})

//获取单个分类

router.get("/category",auth,async(req,res,next)=>{
    try{
        let {id} = req.query
        const data = await catetoryModel.findById(id)
        res.json({
            code:200,
            msg:"获取单个分类成功",
            data
        })
    }catch(err){
        next(err)
    }
   
})





//删除一个分类

router.delete("/category",auth,async(req,res,next)=>{
    try{
        let {id} = req.query
        const data = await catetoryModel.findByIdAndRemove(id)
       res.json({
           code:200,
           msg:"删除分类成功"
       })
    }catch(err){
        next(err)
    }
})






module.exports = router