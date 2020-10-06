const Staff = require("../models/staff.model.js");

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

    // Create a staff member
    const staff = new Staff({
        staffId:          req.body.staffId,
        name:             req.body.name,
        phoneNum:         req.body.phoneNum
    });

    // Save staff member in the database
    Staff.create(staff, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Staff."
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findAll = (req, res) => {
    Staff.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Staff"
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Staff.findById(req.params.staffId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Staff with id ${req.params.staffId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Staff with id " + req.params.staffId
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

    Staff.updateById(
        req.params.staffId,
        new Staff(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Staff with id ${req.params.staffId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating Staff with id " + req.params.staffId
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
    Staff.remove(req.params.staffId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Staff with id ${req.params.staffId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete Staff with id " + req.params.staffId
                });
            }
        }
        else {
            res.send({
                message: `Staff was deleted successfully!`
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    Staff.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Staff."
            });
        }
        else {
            res.send({
                message: `All Staff were deleted successfully!`
            });
        }
    });
};