const sql = require("./db.js");

const Status = function(status) {
    this.statusId     = status.statusId;
    this.name   = status.name;
};

errFunction = (err) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
}

resAffectedFunction = (res) => {
    if (res.affectedRows == 0) {
        result( { kind: "not_found"}, null);
        return;
    }
}

Status.create = (newStatus, result) => {
    sql.query("INSERT INTO status SET ?", newStatus, (err, res) => {
        errFunction(err);

        console.log("created Status: ", { id: res.insertId, ...newStatus });
        result(null, { id: res.insertId, ...newStatus });
    });
};

Status.findById = (id, result) => {
    sql.query(`SELECT * FROM status WHERE statusId = ${id}`, (err, res) => {
        errFunction(err);

        if (res.length) {
            console.log("Found Status: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Status.getAll = result => {
    sql.query("SELECT * FROM status", (err, res) => {
        errFunction(err);

        console.log("Status: ", res);
        result(null, res);
    });
};

Status.updateById = (id, status, result) => {
    sql.query(
        "UPDATE status SET name = ? WHERE statusId = ?",
        [
            status.name,
            id
        ],
        (err, res) => {
            errFunction(err);
            resAffectedFunction(res);

            console.log("Updated Status: ", { id: id, ...status });
            result(null, { id: id, ...status });
        }
    );
};

Status.remove = (id, result) => {
    sql.query("DELETE FROM status WHERE statusId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted Status with statusId: ", id);
        result(null, res);
    });
};

Status.removeAll = result => {
    sql.query("DELETE FROM status", (err, res) => {
        errFunction(err);

        console.log(`Deleted ${res.affectedRows} Status`);
        result(null, res);
    });
};

module.exports = Status;