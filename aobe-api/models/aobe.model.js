const sql = require("./db.js");

const Aobe = function(aobe) {
    this.aobeId = aobe.aobeId;
    this.ip     = aobe.ip;
    this.name   = aobe.name;
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

Aobe.create = (newAobe, result) => {
    sql.query("INSERT INTO aobe SET ?", newAobe, (err, res) => {
        errFunction(err);

        console.log("created Aobe: ", { id: res.insertId, ...newAobe });
        result(null, { id: res.insertId, ...newAobe });
    });
};

Aobe.findById = (id, result) => {
    sql.query(`SELECT * FROM aobe WHERE aobeId = ${id}`, (err, res) => {
        errFunction(err);

        if (res.length) {
            console.log("Found aobe: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Aobe.getAll = result => {
    sql.query("SELECT * FROM aobe", (err, res) => {
        errFunction(err);

        console.log("Aobe: ", res);
        result(null, res);
    });
};

Aobe.updateById = (id, result) => {
    sql.query(
        "UPDATE aobe SET ip = ?, name = ? WHERE aobeId = ?",
        [
            aobe.ip,
            aobe.name,
            id
        ],
        (err, res) => {
            errFunction(err);
            resAffectedFunction(res);

            console.log("Updated aobe: ", { id: id, ...aobe });
            result(null, { id: id, ...aobe });
        }
    );
};

Aobe.remove = (id, result) => {
    sql.query("DELETE FROM aobe WHERE aobeId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted aobe with id: ", id);
        result(null, res);
    });
};

Aobe.removeAll = result => {
    sql.query("DELETE FROM aobe", (err, res) => {
        errFunction(err);

        console.log(`Deleted ${res.affectedRows} aobe`);
        result(null, res);
    });
};

module.exports = Aobe;