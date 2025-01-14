import User from "../models/User.js";


export const registerUser = async ( req,res, next) => {
    try {
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user) {
            throw new Error("User have already resigter")
        }
        user = await User.create({
            name,
            email,
            password,
        });
        return res.status(200).json({
            _id:user._id,
            avatar:user.avatar,
            name:user.name,
            email:user.email,
            password:user.password,
            verified:user.verified,
            admin:user.admin,
            token:await user.generateJWT(),
        })
    } catch (error) {
        next(error);
    }
}