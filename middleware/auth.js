// const jsonToken = require('jsonwebtoken');
// const {TOKEN_KEY} = process.env;
//
//
// const middleware = async (req, res, next) => {
//     const token = req.headers['x-access-token']
//
//     if (!token) {
//         return res.status(400).json({success: false, msg: "token is required."})
//     }
//
//     try {
//         const decrypt = jsonToken.verify(token, TOKEN_KEY);
//         req.user = decrypt;
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({success: false, msg: error.message});
//     }
//     return next();
// }
//
// module.exports = middleware;
//
//
