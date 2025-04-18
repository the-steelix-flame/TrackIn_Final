module.exports.isLoggedIn = (req,res,next) =>{
    // console.log(req.path,req.originalUrl);
    if(!req.isAuthenticated()){  //TO_CHECK_USER_IS_LOGGED-IN_OR_NOT!!
        //req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in!!");
        return res.redirect("/login");
    }
    next();
};
