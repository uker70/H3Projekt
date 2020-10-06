const sql = require("./db.js");

const Aobe = function(aobe) {
    this.aobeId = aobe.aobeId;
    this.ip     = aobe.ip;

    // Shitty fix for update method to work.
    this.name = aobe.name ? aobe.name : aobe.aobeName;

    //this.name   = aobe.name;
    this.locationId = aobe.locationId;
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

    console.log(newAobe);

    // I want to grab the location also...
    sql.query("SELECT * FROM location WHERE locationId = ?", [
        newAobe.locationId
    ], (err, resLocation) => {

        let location = resLocation[0];

        sql.query("INSERT INTO aobe(ip, location, aobeName) VALUES (?, ?, ?)", [
            newAobe.ip,
            newAobe.locationId,
            newAobe.name
        ], (err, res) => {
            console.log("created Aobe: " , {id: res.insertId, location: location, ...newAobe });
            result(null, {id: res.insertId, location: location, ...newAobe});
    });

    })

    

    // sql.query("INSERT INTO aobe SET ?", newAobe, (err, res) => {
    //     errFunction(err);

    //     console.log("created Aobe: ", { id: res.insertId, ...newAobe });
    //     result(null, { id: res.insertId, ...newAobe });
    // });
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

Aobe.updateById = (id, aobe, result) => {
    
    console.log('yup');
    console.log(aobe);
    
    console.table(aobe);

    sql.query("SELECT * FROM location WHERE locationId = ?", [
        aobe.locationId
    ], (err, resLocation) => {

        let location = resLocation[0];

        sql.query("UPDATE aobe SET ip = ?,  aobeName = ?, location = ? WHERE aobeId = ?", [
            aobe.ip,
            aobe.name,
            aobe.locationId,
            id
        ], (err, res) => {
            errFunction(err);
            resAffectedFunction(res);
    
            console.log("Updated aobe: ", { id: id, location: location, ...aobe });
            result(null, { id: id, location: location, ...aobe });
        });

    });

    

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