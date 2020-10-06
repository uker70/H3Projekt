const Users = require("../models/user.model.js");


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
    // Create a User
    const user = new Users({
        userId:     req.body.userId,
        username:   req.body.username,
        password:   req.body.password,
        userLevel:  req.body.userLevel,
        phoneNum:   req.body.phoneNum,
        name:       req.body.name
    });
    
    // Save User in the database
    Users.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Users."
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.login = (req, res) => {
    const user = new Users({
        username: req.body.username,
        password: req.body.password
    });
    
    Users.login(user, (err, data) => {
        if (err) {
            console.log("error " + err);
            res.status(500).send({
                message:
                err.message
            });
        }
        else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Users.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Users"
            });
        }
        else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Users.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
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

    Users.updateById(
        req.params.userId,
        new Users(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.userId
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
    Users.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        }
        else {
            res.send({
                message: `User was deleted successfully!`
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    Users.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        }
        else {
            res.send({
                message: `All Users were deleted successfully!`
            });
        }
    });
};