const sql = require("./db.js");
const jwt = require("jsonwebtoken");

const Users = function(users) {
    this.userId     = users.userId;
    this.username   = users.username;
    this.password   = users.password;
    this.phoneNum   = users.phoneNum;
    this.name       = users.name;
    this.userLevel  = users.userLevel;
};


const bcrypt = require("bcryptjs");
const saltRounds = 10;

errFunction = (err) => {
    if (err != null) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
};

resAffectedFunction = (res) => {
    if (res.affectedRows == 0) {
        result( { kind: "not_found"}, null);
        return;
    }
};

Users.create = (newUser, result) => {
    const username  = newUser.username;
    const pass      = newUser.password;
    const phoneNum  = newUser.phoneNum;
    const name      = newUser.name;
    const userLevel = newUser.userLevel;

    bcrypt.hash(pass, saltRounds, function(err, hash) {
        sql.query("INSERT INTO users (username, password, userLevel) VALUES (?, ?, ?)", [username, hash, userLevel], (err, res) => {
            errFunction(err);
    
            console.log("created User: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
        });

        sql.query("INSERT INTO staff (phoneNum, name) VALUES (?, ?)", [phoneNum, name], (err, res) => {
            errFunction(err);

            console.log("created Staff: ", {id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
        });
    });

};

Users.login = (user, result) => {
    sql.query("SELECT * FROM users WHERE username = ?",
    [
        user.username
    ],
    (err, res) => {
        errFunction(err);
        if (res.length) {
            console.log("user pass " + user.password + " res pass " + res[0].password)
            if(bcrypt.compareSync(user.password, res[0].password)) {
                console.log("Found User: ", res[0]);
                const token = jwt.sign({
                    email: res[0].username,
                    userId: res[0].userId,
                    userLevel: res[0].userLevel
                }, process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                response = {"token":token};
                console.log(token);
                result(null, response);
                return;        
            }
        }
        result("login details not found", null);
        
    });
};

Users.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE userId = ${id}`, (err, res) => {
        errFunction(err);

        if (res.length) {
            console.log("Found User: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Users.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        errFunction(err);

        console.log("Users: ", res);
        result(null, res);
    });
};

Users.updateById = (id, users, result) => {
    const pass = users.password;
    bcrypt.hash(pass, saltRounds, function(err, hash) {
        sql.query(
            "UPDATE users SET username = ?, password = ?, userLevel = ? WHERE userId = ?",
            [
                users.username,
                hash,
                users.userLevel,
                id
            ],
            (err, res) => {
                errFunction(err);
                resAffectedFunction(res);

                console.log("Updated User: ", { id: id, ...users });
                result(null, { id: id, ...users });
            }
        );
    });
};

Users.remove = (id, result) => {
    sql.query("DELETE FROM staff WHERE userId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted User with userId: ", id);
    });
    sql.query("DELETE FROM users WHERE userId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted User with userId: ", id);
        result(null, res);
    });
};

Users.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        errFunction(err);

        console.log(`Deleted ${res.affectedRows} Users`);
        result(null, res);
    });
};

module.exports = Users;