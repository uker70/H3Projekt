const Incident = require("../models/incident.model.js");

err400Function = (req) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
}

exports.create = (req, res) => {
    // Validate request
    err400Function(req);

    // Create an incident
    const incident = new Incident({
        incidentId:             req.body.incidentId,
        description:            req.body.description,
        incidentDate:           req.body.incidentDate,
        percentage:             req.body.percentage,
        img:                    req.body.img,
        areaName:               req.body.areaName,
        ip:                     req.body.ip,
        statusName:             req.body.statusName,
        aobeName:               req.body.aobeName,
        caseId:                 req.body.caseId
    });

    // Save incident in the database
    Incident.create(incident, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the incident."
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findAll = (req, res) => {
    Incident.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving incidents"
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Incident.findById(req.params.incidentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found incident with id ${req.params.incidentId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving incident with id " + req.params.incidentId
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

    Incident.updateById(
        req.params.incidentId,
        new Incident(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found incident with id ${req.params.incidentId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating incident with id " + req.params.incidentId
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
    Incident.remove(req.params.incidentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found incident with id ${req.params.incidentId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete incident with id " + req.params.incidentId
                });
            }
        }
        else {
            res.send({
                message: `incident was deleted successfully!`
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    Incident.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all incidents."
            });
        }
        else {
            res.send({
                message: `All incidents were deleted successfully!`
            });
        }
    });
};