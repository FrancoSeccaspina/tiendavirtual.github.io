const db = require('../database/models/index');

let middleware = (req,res,next) => {

    let user = null

    if(req.cookie && req.cookie.user){
        const user = db.user.findOne({
            where:{
                email: req.cookies.user
            }
        })
        console.log(user)
        const success = data => req.session.user = data
        const error = error => res.render(error)
        user.then(success).catch(error)
    }

    if(req.session && req.session.user){
        user = req.session.user
    }

    res.locals.userLogged = user

    return next()
}
module.exports = middleware;