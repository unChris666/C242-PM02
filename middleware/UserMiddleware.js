const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');


exports.authMiddleware = async (req,res,next) => {
    // 1. fungsi jika di header kita masukan token atau tidak
    let token;
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     token = req.headers.authorization.split(" ")[1];
    // }

    token = req.cookies.jwt

    if(!token){
        return next(res.status(401).json({
            status: 401,
            message: "Anda belum Login/register token tidak ditemukan"
        }))
    }
    
    // console.log(token)
    // 2) decode verifikasi token
    // invalid token - synchronous
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        return next( res.status(401).json({
            error: err,
            message: "Token yang dimasukan tidak ditemukan"
        }))
    }

    // 3) ambil data user berdasarkan kondisi decoded
    const currentUser = await User.findByPk(decoded.id);
    if(!currentUser){
        return next(res.status(401).json({
            status: 401,
            message: "User tidak ditemukan token tidak bisa digunakan"
        }))
    }
    // console.log(currentUser)

    req.user = currentUser;

    next()
}

exports.permissionUser = (...roles) => {
    return async(req, res, next) => {
        const rolesData = await Role.findByPk(req.user.role_id)

        const roleName = rolesData.name

        if(!roles.includes(roleName)){
            return next(res.status(403).json({
                status: 403,
                error: "Anda tidak memiliki akses ke halaman ini"
            }))
        }

        next()
    }
}