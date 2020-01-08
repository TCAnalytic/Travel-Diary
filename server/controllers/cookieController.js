const db = require('../models/dbModel');
const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    // const randomNum = Math.floor(Math.random() * 100);
    const { username } = req.body;
    res.cookie('username', username, { maxAge: 600000, httpOnly: false });
    return next();
}

module.exports = cookieController;

// controller.setSSIDCookie = (req, res, next) => {
//     res.cookie('ssid', res.locals.id, { httpOnly: true });
//     return next();
// }