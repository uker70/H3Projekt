const AobeLocations = require("../models/aobe_locations.model.js");

err400Function = (req) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
};

exports.create = (req, res) => {
    // Validate request
    err400Function(req);

    // Create a location
    const aobeLocation = new AobeLocations({
        locationId:      req.body.locationId,
        areaName:        req.body.areaName
    });

    // Save location in the database
    AobeLocations.create(aobeLocation, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Location."
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findAll = (req, res) => {
    AobeLocations.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Locations"
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    AobeLocations.findById(req.params.locationId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Location with id ${req.params.locationId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Location with id " + req.params.locationId
                });
            }
        }
        else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    // Validate Request
    err400Function(req);

    AobeLocations.updateById(
        req.params.locationId,
        new AobeLocations(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Location with id ${req.params.locationId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating Location with id " + req.params.locationId
                    });
                }
            }
            else {
                res.send(data);
            }
        }
    );
};

exports.delete = (req, res) => {
    AobeLocations.remove(req.params.locationId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Location with id ${req.params.locationId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete Location with id " + req.params.locationId
                });
            }
        }
        else {
            res.send({
                message: `Location was deleted successfully!`
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    AobeLocations.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Locations."
            });
        }
        else {
            res.send({
                message: `All Locations were deleted successfully!`
            });
        }
    });
};