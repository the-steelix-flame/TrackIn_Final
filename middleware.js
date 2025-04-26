module.exports.isLoggedIn = (req, res, next) => {
    if (!req.user) {  
        req.flash("error", "You must be logged in!!");
        return res.redirect("/login");
    }
    next();
};


module.exports.setCurrentUser = (req, res, next) => {
    res.locals.currentUser = req.user || null;
    next();
};
