const Aobe = require("../models/aobe.model.js");

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

    // Create an aobe
    const aobe = new Aobe({
        aobeId: req.body.aobeId,
        ip:     req.body.ip,
        name:   req.body.name
    });

    // Save aobe in the database
    Aobe.create(aobe, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Aobe."
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findAll = (req, res) => {
    Aobe.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Aobe"
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Aobe.findById(req.params.aobeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Aobe with id ${req.params.aobeId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Aobe with id " + req.params.aobeId
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

    Aobe.updateById(
        req.params.aobeId,
        new Aobe(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Aobe with id ${req.params.aobeId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating Aobe with id " + req.params.aobeId
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
    Aobe.remove(req.params.aobeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Aobe with id ${req.params.aobeId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete Aobe with id " + req.params.aobeId
                });
            }
        }
        else {
            res.send({
                message: `Aobe was deleted successfully!`
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    Aobe.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Aobe."
            });
        }
        else {
            res.send({
                message: `All Aobe were deleted successfully!`
            });
        }
    });
};