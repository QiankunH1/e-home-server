const express = require("express")
const router = express.Router()
const auth = require("../controller/auth")
const newsModel = require ("../model/news")

//新建一条新闻
router.post("/addnews",auth,async(req,res,next)=>{
    try{
        let {
            author,
              type,
              looknum,
              title,
              content,
              contentText,
              img
        }=req.body
    const data = await newsModel.create({
        author,
        type,
        looknum,
        title,
        content,
        contentText,
        img
    })
    res.json({
        code:200,
        msg:"创建新闻成功",
        data
    })
    }catch(err){
        next(err)
    }
})


//获取新闻列表

router.get("/newsList",async(req,res,next)=>{
    try{
        let count = await newsModel.count()
        let{pn=1,size=10} = req.query
        pn=parseInt(pn)
        size=parseInt(size)
        const data = await newsModel.find().skip((pn-1)*size).limit(size)
        .populate({path:"author",select:"-password"})
        .populate({path:"type"})
        res.json({
            code:200,
            msg:"获取新闻列表成功",
            data,
            count
        })
    }catch(err){
        next(err)
    }
})

//获取单个新闻 params

router.get("/new/:id",auth,async(req,res,next)=>{
    try{
        let {id} =req.params
        const data = await newsModel.findById(id)
        .populate({ path: "author", select: "-password" })
        .populate({ path: "type" });
        res.json({
            code:200,
            msg:"获取单个新闻成功",
            data
        })
    }catch(err){
        next(err)
    }
})


//获取单个新闻 query

// router.get("/new",auth,async(req,res,next)=>{
//     try{
//         let {id} =req.query
//         const data = await newsModel.findById(id)
//         .populate({ path: "author", select: "-password" })
//         .populate({ path: "type" });
//         res.json({
//             code:200,
//             msg:"获取单个新闻成功",
//             data
//         })
//     }catch(err){
//         next(err)
//     }
// })

//删除一个新闻


router.delete("/new/:id",auth,async(req,res,next)=>{
    try{
        let {id} = req.params
        const data = await newsModel.findByIdAndRemove(id)
        res.json({
            code:200,
            msg:"删除新闻成功",
            data
        })
    }catch(err){
        next(err)
    }
})































module.exports=router