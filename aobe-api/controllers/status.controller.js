const Status = require("../models/status.model.js");

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

    // Create a status
    const status = new Status({
        statusId: req.body.statusId,
        name:   req.body.name
    });

    // Save status in the database
    Status.create(status, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Status."
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findAll = (req, res) => {
    Status.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Status"
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Status.findById(req.params.statusId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Status with id ${req.params.statusId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Status with id " + req.params.statusId
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

    Status.updateById(
        req.params.statusId,
        new Status(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Status with id ${req.params.statusId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating Status with id " + req.params.statusId
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
    Status.remove(req.params.statusId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Status with id ${req.params.statusId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete Status with id " + req.params.statusId
                });
            }
        }
        else {
            res.send({
                message: `Status was deleted successfully!`
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    Status.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Status."
            });
        }
        else {
            res.send({
                message: `All Status were deleted successfully!`
            });
        }
    });
};