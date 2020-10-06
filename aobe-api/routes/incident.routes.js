module.exports = app => {
    const incident = require("../controllers/incident.controller.js");

    app.post("/incident", incident.create);

    app.get("/incident", incident.findAll);

    app.delete("/incident", incident.deleteAll);

    app.get("/incident/:incidentId", incident.findOne);

    app.put("/incident/:incidentId", incident.update);

    app.delete("/incident/:incidentId", incident.delete);
};