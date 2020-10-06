module.exports = app => {
    const messages = require("../controllers/messages.controller.js");

    app.post("/messages", messages.create);

    app.get("/messages", messages.findAll);

    app.delete("/messages", messages.deleteAll);

    app.get("/messages/:messageId", messages.findOne);

    app.put("/messages/:messageId", messages.update);

    app.delete("/messages/:messageId", messages.delete);
};