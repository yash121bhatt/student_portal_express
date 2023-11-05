const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const checkAuth = async (req, res, next) => {
    // console.log('helllo middleware')
    const { token } = req.cookies
    // console.log(token);
    if (!token) {
        req.flash('error', 'Unauthorised User Please Login')
        res.redirect('/')
    } else {
        const verifyToken = jwt.verify(token, 'Yash12346789bhatt@@')
        // console.log(verifyToken);
        const data = await UserModel.findOne({_id:verifyToken.ID})

        // console.log(data)
        req.data1 = data;
        next()

    }
}

module.exports = checkAuth