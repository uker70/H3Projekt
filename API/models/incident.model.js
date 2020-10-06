const sql = require("./db.js");

const Incident = function(incident) {
    this.incidentId         = incident.incidentId;
    this.description        = incident.description;
    this.incidentDate       = incident.incidentDate;
    this.percentage         = incident.percentage;
    this.img                = incident.img;
    this.areaName           = incident.areaName;
    //this.ip                 = incident.ip;
    this.statusName         = incident.statusName;
    this.aobeName           = incident.aobeName;

    this.statusId = incident.statusId;
    this.locationId = incident.locationId;

    //this.caseId             = incident.caseId;
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

Incident.create = (newIncident, result) => {
    let locationID = 0;
    let location;
    let caseID = 0;

    sql.query("INSERT INTO caseimg(img) VALUES (?)", [
        newIncident.img,
    ], (err, res) => {

        errFunction(err);
        caseID = res.insertId;

        // Then grab location.
        sql.query("SELECT * FROM location WHERE areaName = ?", [
            newIncident.areaName
        ], (err, res) => {

            errFunction(err);            
            locationID = res[0]["locationId"];
            location = res[0];

            //Then insert into Incidents.
            sql.query("INSERT INTO incident SET description = ?, incidentDate = ?, percentage = ?, status = 2, location = ?, imgId = ?", [
                newIncident.description,
                newIncident.incidentDate,
                newIncident.percentage,
                locationID,
                caseID
            ], (err, resIncident) => {
                errFunction(err);
                console.table(resIncident);

                // Fix to also return status.
                sql.query("SELECT * FROM status WHERE statusId = 2", [], (err, res) => {

                    let status = res[0];

                    console.log("created Incident: ", { id: resIncident.insertId, location: location, status: status, ...newIncident });
                    result(null, { id: resIncident.insertId, location, status: status, ...newIncident });
                });


                
            });


        });
   
    });

    // sql.query("SELECT locationId FROM location WHERE areaName = ?", [
    //     newIncident.areaName
    // ], (err, res) => {
    //     errFunction(err);

    //     locationID = res;
    // });
    
    
    
};

Incident.findById = (id, result) => {
    sql.query(`SELECT * FROM incident WHERE incidentId = ${id}`, (err, res) => {
        errFunction(err);

        if (res.length) {
            console.log("Found incident: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Incident.getAll = result => {
    sql.query("SELECT * FROM incident", (err, res) => {
        errFunction(err);

        console.log("Incidents: ", res);
        result(null, res);
    });
};

Incident.updateById = (id, incident, result) => {
    sql.query(
        "UPDATE incident SET description = ?, status = ?, location = ? WHERE incidentId = ?",
        [
            incident.description,
            incident.statusId,
            incident.locationId,
            //incident.incidentDate,
            //incident.percentage,
            id
        ],
        (err, res) => {
            errFunction(err);
            resAffectedFunction(res);

            console.log("Updated incident: ", { id: id, ...incident });
            result(null, { id: id, ...incident });
        }
    );
};

Incident.remove = (id, result) => {
    sql.query("DELETE FROM incident WHERE incidentId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted incident with id: ", id);
        result(null, res);
    });
};

Incident.removeAll = result => {
    sql.query("DELETE FROM incident", (err, res) => {
        errFunction(err);

        console.log(`Deleted ${res.affectedRows} Incidents`);
        result(null, res);
    });
};

module.exports = Incident;