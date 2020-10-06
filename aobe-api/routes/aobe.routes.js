module.exports = app => {
    const aobe = require("../controllers/aobe.controller.js");

    app.post("/aobe", aobe.create);

    app.get("/aobe", aobe.findAll);

    app.delete("/aobe", aobe.deleteAll);

    app.get("/aobe/:aobeId", aobe.findOne);

    app.put("/aobe/:aobeId", aobe.update);

    app.delete("/aobe/:aobeId", aobe.delete);
};