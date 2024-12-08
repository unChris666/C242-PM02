const { User } = require('../models')
const jwt = require('jsonwebtoken')

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expire: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }

    res.cookie('jwt', token, cookieOptions)

    user.password = undefined;
    
    res.status(statusCode).json({
        status: 'success',
        data: {
            user
        }
    })
}

exports.registerUser = async (req, res) => {
    try {
        if(req.body.password != req.body.passwordConfirm){
            return res.status(400).json({
                message: 'Validasi Error',
                error: ['Password dan Konfirmasi Password Harus Sama']
            })
        }

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        createSendToken(newUser, 201, res)
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Validasi error",
            error: error.errors.map(err => err.message)
        })
    }
}

exports.loginUser = async (req, res) => {
    // 1) fungsi validasi
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            status: "Fail",
            message: "Email Validasi",
            error: "Please input email/password"
        })
    }

    // 2) check jika user email yang di masukan di request ada di database
    // dan password benar yang di input di request

    const userData = await User.findOne({ where: { email: req.body.email } })

    if(!userData || !(await userData.CorrectPassword(req.body.password, userData.password))){
        return res.status(404).json({
            status: "Fail",
            message: "Error Login",
            error: "Invalid Email or Password"
        })
    }

    // 3) jika email dan password benar, maka kirim token ke client
    createSendToken(userData, 200, res)
}

exports.logoutUser = async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires:new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    })

    res.status(200).json({
        message: "Logout Success"
    })
}

exports.getMyUser = async(req, res) => {
    const currentUser = await User.findByPk(req.user.id);

    if (currentUser) {
        return res.status(200).json({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role_id: currentUser.role_id
        })
    }

    return res.status(404).json({
        message: "User tidak ditemukan"
    })
}