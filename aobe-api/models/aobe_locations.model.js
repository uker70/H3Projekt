const sql = require("./db.js");

const AobeLocations = function(aobeLocations) {
    this.locationId   = aobeLocations.locationId;
    this.areaName     = aobeLocations.areaName;
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

AobeLocations.create = (newAobeLocations, result) => {
    sql.query("INSERT INTO location SET ?", newAobeLocations, (err, res) => {
        errFunction(err);

        console.log("created AobeLocation: ", { id: res.insertId, ...newAobeLocations });
        result(null, { id: res.insertId, ...newAobeLocations });
    });
};

AobeLocations.findById = (id, result) => {
    sql.query(`SELECT * FROM location WHERE locationId = ${id}`, (err, res) => {
        errFunction(err);

        if (res.length) {
            console.log("Found Location: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

AobeLocations.getAll = result => {
    sql.query("SELECT * FROM location", (err, res) => {
        errFunction(err);

        console.log("Locations: ", res);
        result(null, res);
    });
};

AobeLocations.updateById = (id, aobeLocations, result) => {
    sql.query(
        "UPDATE location SET areaName = ? WHERE locationId = ?",
        [
            aobeLocations.areaName,
            id
        ],
        (err, res) => {
            errFunction(err);
            resAffectedFunction(res);

            console.log("Updated location: ", { id: id, ...aobeLocations });
            result(null, { id: id, ...aobeLocations });
        }
    );
};

AobeLocations.remove = (id, result) => {
    sql.query("DELETE FROM location WHERE locationId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted Location with id: ", id);
        result(null, res);
    });
};

AobeLocations.removeAll = result => {
    sql.query("DELETE FROM location", (err, res) => {
        errFunction(err);

        console.log(`Deleted ${res.affectedRows} Locations`);
        result(null, res);
    });
};

module.exports = AobeLocations;