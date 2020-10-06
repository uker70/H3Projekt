module.exports = app => {
    const status = require("../controllers/status.controller.js");

    app.post("/status", status.create);

    app.get("/status", status.findAll);

    app.delete("/status", status.deleteAll);

    app.get("/status/:statusId", status.findOne);

    app.put("/status/:statusId", status.update);

    app.delete("/status/:statusId", status.delete);
};