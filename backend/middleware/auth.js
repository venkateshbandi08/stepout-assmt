import jwt from 'jsonwebtoken'

const authMiddleware = async(req,res,next) => {
    const token = req.header('Authorization');
    console.log(token);

    if(!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JSONSECRETKEY);
        req.user = {id:token_decode.id}
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false,message: "Error"})
        
    }
}

export default authMiddleware