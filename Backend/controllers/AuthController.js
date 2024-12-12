const { User } = require('../models')
const jwt = require('jsonwebtoken')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    // Instead of setting the cookie here, we simply return the token.
    // Remove the res.cookie line and cookieOptions completely.

    user.password = undefined;
    
    res.status(statusCode).json({
        status: 'success',
        token, // send the token in the JSON response
        data: {
            user
        }
    });
}

exports.registerUser = async (req, res) => {
    try {
        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({
                message: 'Validasi Error',
                error: ['Password dan Konfirmasi Password Harus Sama']
            });
        }

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        createSendToken(newUser, 201, res);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Validasi error",
            error: error.errors.map(err => err.message)
        });
    }
}

exports.loginUser = async (req, res) => {
    // 1) Validate email and password input
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            status: "Fail",
            message: "Email Validasi",
            error: "Please input email/password"
        });
    }

    // 2) Check if the user exists and if the password is correct
    const userData = await User.findOne({ where: { email: req.body.email } });
    if(!userData || !(await userData.CorrectPassword(req.body.password, userData.password))){
        return res.status(404).json({
            status: "Fail",
            message: "Error Login",
            error: "Invalid Email or Password"
        });
    }

    // 3) If everything is OK, send token to client
    createSendToken(userData, 200, res);
}

exports.logoutUser = async (req, res) => {
    // Since we're no longer setting the cookie on the server side,
    // you can instruct the frontend to clear their cookie.
    // If you still want to clear the cookie from the BE side, you can do:
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    res.status(200).json({
        message: "Logout Success"
    });
}

exports.getMyUser = async (req, res) => {
    const currentUser = await User.findByPk(req.user.id);

    if (currentUser) {
        return res.status(200).json({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role_id: currentUser.role_id
        });
    }

    return res.status(404).json({
        message: "User tidak ditemukan"
    });
}
