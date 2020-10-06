module.exports = app => {
    const aobeLocations = require("../controllers/aobe_locations.controller.js");

    app.post("/aobe_locations", aobeLocations.create);

    app.get("/aobe_locations", aobeLocations.findAll);

    app.delete("/aobe_locations", aobeLocations.deleteAll);

    app.get("/aobe_locations/:locationId", aobeLocations.findOne);

    app.put("/aobe_locations/:locationId", aobeLocations.update);

    app.delete("/aobe_locations/:locationId", aobeLocations.delete);
};