const Messages = require("../models/messages.model.js");

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

    // Create a message
    const messages = new Messages({
        messageId:     req.body.messageId,
        message:       req.body.message,
        readState:     req.body.readState,
        senderId:      req.body.senderId,
        recepientId:   req.body.recepientId
    });

    // Save message in the database
    Messages.create(messages, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Messages."
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findAll = (req, res) => {
    Messages.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Messages"
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Messages.findById(req.params.messageId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Message with id ${req.params.messageId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Message with id " + req.params.messageId
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

    Messages.updateById(
        req.params.messageId,
        new Messages(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Messages with id ${req.params.messageId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating Messages with id " + req.params.messageId
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
    Messages.remove(req.params.messageId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Messages with id ${req.params.messageId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete Messages with id " + req.params.messageId
                });
            }
        }
        else {
            res.send({
                message: `Messages was deleted successfully!`
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    Messages.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Messages."
            });
        }
        else {
            res.send({
                message: `All Messages were deleted successfully!`
            });
        }
    });
};