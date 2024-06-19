const User = require('../Model/Usermodel')
const jwt=require('jsonwebtoken')
 const  secretkey="srinivas$30$11$2002$"
const HandleLoginuser = async (req, res) => {
  
    const { email, password } = req.body;
    try {
        if (email==null|| password==null)
            return res.status(500).send({
                success: false,
                error: "Email or Password is Required"
            })
        const user = await User.findOne({ email :email,password:password})
       if (!user){
        return res.status(500).send({
            success:false,
            error:"User not Found"
        })
       }
       
       return res.status(200).send({
        success:true,
        message:"User Login Successfull",
        
       })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            error,
            message: "User Login is Failed"
        })
    }

}
const HandleUserSignupController =async (req,res)=>{
    const {name,email,password,phonenumber}=req.body;
    const user = await User.findOne({email});
    if (email ==null || name ==null || password==null || phonenumber==null) return res.send({
        success:false,
        error:"all Fields are required",
    })
    if (user){
        return res .send({
            success:false,
            error:' User Already Exist Please Login'
        })
    }
    const token =jwt.sign({...user},secretkey);
    await User.create ({
        name,
        email,
        password,
        phonenumber
    })
    return res .send({
        success:true,
        message:"Signup is Successfull",
        token:token
    })

}
module.exports =  {HandleLoginuser,HandleUserSignupController} 