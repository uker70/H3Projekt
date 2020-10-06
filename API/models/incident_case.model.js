const sql = require("./db.js");

const IncidentCase = function(incidentCase) {
    this.caseId     = incidentCase.caseId;
    this.img        = incidentCase.img;
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

IncidentCase.create = (newIncidentCase, result) => {
    sql.query("INSERT INTO caseImg SET ?", newIncidentCase, (err, res) => {
        errFunction(err);

        console.log("created caseImg: ", { id: res.insertId, ...newIncidentCase });
        result(null, { id: res.insertId, ...newIncidentCase });
    });
};

IncidentCase.findById = (id, result) => {
    sql.query(`SELECT * FROM caseImg WHERE caseId = ${id}`, (err, res) => {
        errFunction(err);

        if (res.length) {
            console.log("Found caseImg: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

IncidentCase.getAll = result => {
    sql.query("SELECT * FROM caseimg", (err, res) => {
        errFunction(err);

        console.log("caseImg: ", res);
        result(null, res);
    });
};

IncidentCase.updateById = (id, result) => {
    sql.query(
        "UPDATE caseImg SET img = ? WHERE caseId = ?",
        [
            incidentCase.img,
            id
        ],
        (err, res) => {
            errFunction(err);
            resAffectedFunction(res);

            console.log("Updated caseImg: ", { id: id, ...incidentCase });
            result(null, { id: id, ...incidentCase });
        }
    );
};

IncidentCase.remove = (id, result) => {
    sql.query("DELETE FROM caseImg WHERE caseId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted caseImg with id: ", id);
        result(null, res);
    });
};

IncidentCase.removeAll = result => {
    sql.query("DELETE FROM caseImg", (err, res) => {
        errFunction(err);

        console.log(`Deleted ${res.affectedRows} caseImg`);
        result(null, res);
    });
};

module.exports = IncidentCase;