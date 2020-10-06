const IncidentCase = require("../models/incident_case.model.js");

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

    // Create a case
    const incidentCase = new IncidentCase({
        caseId:     req.body.caseId,
        img:        req.body.img
    });

    // Save case in the database
    IncidentCase.create(incidentCase, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the caseImg."
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findAll = (req, res) => {
    IncidentCase.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving caseImg"
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    IncidentCase.findById(req.params.caseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found caseImg with id ${req.params.caseId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving caseImg with id " + req.params.caseId
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

    IncidentCase.updateById(
        req.params.caseId,
        new IncidentCase(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found caseImg with id ${req.params.caseId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating caseImg with id " + req.params.caseId
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
    IncidentCase.remove(req.params.caseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found caseImg with id ${req.params.caseId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete caseImg with id " + req.params.caseId
                });
            }
        }
        else {
            res.send({
                message: `caseImg was deleted successfully!`
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    IncidentCase.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all caseImg."
            });
        }
        else {
            res.send({
                message: `All caseImg were deleted successfully!`
            });
        }
    });
};