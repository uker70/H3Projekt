module.exports = app => {
    const incidentCase = require("../controllers/incident_case.controller.js");

    app.post("/incidentCase", incidentCase.create);

    app.get("/incidentCase", incidentCase.findAll);

    app.delete("/incidentCase", incidentCase.deleteAll);

    app.get("/incidentCase/:caseId", incidentCase.findOne);

    app.put("/incidentCase/:caseId", incidentCase.update);

    app.delete("/incidentCase/:caseId", incidentCase.delete);
};