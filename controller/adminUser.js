const express=require("express")
const router = express.Router()
const adminUserModel = require("../model/adminUser")



//管理员注册
router.post('/adminUser',async(req,res,next)=>{
    try{
       let{
        username,
        password,
        nickname,
        avatar,
        desc,
        job,
        phone,
        sex,
       } =req.body
       if(username&&password){
        const data= await adminUserModel.create({
            username,
            password,
            nickname,
            avatar,
            desc,
            job,
            phone,
            sex,
           })
           res.json({
               code:200,
               data,
               msg:"新建管理员成功"
           })
       }else{
           res.json({
               code:401,
               msg:"缺少必要参数"
           })
       }     
    }catch(err){
        next(err)
    }
})


//管理员登录接口
router.post('/adminUser/login',async(req,res,next)=>{
    try{
        const{username,password}=req.body
        if(username&&password){
            const user = await adminUserModel.findOne({username})
            if(user){
             if(password==user.password){
                req.session.user=user
                res.json({
                    code:200,
                    msg:"登陆成功",
                    data:user
                })
             }else{
                 res.json({
                     code:401,
                     msg:"账号密码错误"
                 })
             }
         }else{
            res.json({
                code:401,
                msg:"账号密码错误"
            })
        }
        }else{
           res.json({
               code:401,
               msg:"缺少必要参数"
           })
        }
    }catch(err){
        next(err)
    }
  
})


// 获取管理员列表
router.get('/adminUser/list',(req,res,next)=>{
    let count = 0
    adminUserModel.count().then(res => {
        count = res
    })
    // console.log(count)
    let {pn=1,size=10} = req.query
    pn=parseInt(pn)
    size=parseInt(size)
    if(req.session.user){
        adminUserModel.find().skip((pn-1)*size).limit(size).select("-password").then(data=>{
            res.json({
                code:200,
                msg:"获取管理员列表成功",
                data,
                count:count
            })
        })
    }else{
        res.json({
            code:401,
            msg:"用户未登录"
        })
    }
})
//获取管理员列表
// router.get('/adminUser/list',async(req,res,next)=>{
//     try{
//         let count = await adminUserModel.count()
//         console.log(count)
//         let {pn=1,size=10} = req.query
//         pn=parseInt(pn)
//         size=parseInt(size)
//         if(req.session.user){
//             console.log('aaa')
//            const data= await adminUserModel.find().skip((pn-1)*size).limit(size).select("-password")
//                 console.log("bbb")
//                 res.json({
//                     code:200,
//                     msg:"获取管理员列表成功",
//                     data,
//                     count:count
           
//         })
//     }else{
//             res.json({
//                 code:401,
//                 msg:"用户未登录"
//             })
//         }
//     }catch(err){
//         next(err)
//     }
   
// })




//获取管理员信息
router.get('/adminUser/info',(req,res,next)=>{
    // const {username} = req.body
    const {username} = req.query
    if(req.session.user){
        console.log(username)
        adminUserModel.findOne({username}).select('-password').then(info=>{
            console.log(info)
            res.json({
                code:200,
                msg:"获取管理员信息成功",
                data:info
            })
        })
    }else{
        res.json({
            code:401,
            msg:"用户登录状态过期，请重新登录"
        })
    }
})



//删除管理员
router.delete("/adminUser/del/:id",async(req,res,next)=>{
    console.log("aaa")
    try{
        let id= req.params.id
        if(req.session.user){
            console.log("bbb")
          await adminUserModel.findByIdAndRemove(id)
            res.json({
                code:200,
                msg:"删除管理员成功",
               
            })
        }else{
            res.json({
                code:401,
                msg:"用户未登录"
            })
        }

    }catch(err){
        next(err)
    }
})




//退出登录
router.get("/adminUser/logout",(req,res,next)=>{
    console.log("ccc")
    if(req.session.user){
        req.session.user=null
        res.json({
            code:200,
            msg:"用户退出成功"
        })
    }else{
        res.json({
            code:401,
            msg:"用户未登录"
        })
    }
})


module.exports=router