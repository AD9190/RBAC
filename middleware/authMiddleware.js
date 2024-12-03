const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    let token;
    let authHeader=req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({message: "Access Denied"});
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decoded;
            console.log("Decoded user is:",req.user);
            next();
        }catch(error){
            return res.status(401).json({message: "Access Denied"});
        }
    }
};

module.exports=verifyToken;