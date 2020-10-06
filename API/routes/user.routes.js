module.exports = app => {
    const users = require("../controllers/user.controller.js");
    // const checkAuth = require("../config/check_Auth");

    
    app.post("/user/register", users.create);
    
    app.post("/login", users.login);
    
    app.get("/user", users.findAll);
    
    app.get("/user/:userId", users.findOne);
    
    app.put("/user/:userId", users.update);
    
    app.delete("/user", users.deleteAll);

    app.delete("/user/:userId", users.delete);
};