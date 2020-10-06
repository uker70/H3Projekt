const { isNullOrUndefined } = require("util");
const sql = require("./db.js");

const Staff = function(staff) {
    this.staffId    = staff.staffId;
    this.name     = staff.name;
    this.phoneNum = staff.phoneNum;
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

Staff.create = (newStaff, result) => {
    sql.query("INSERT INTO staff SET ?", newStaff, (err, res) => {
        errFunction(err);

        console.log("created Staff: ", { id: res.insertId, ...newStaff });
        result(null, { id: res.insertId, ...newStaff });
    });
};

Staff.findById = (id, result) => {

   
    sql.query(`SELECT * FROM staff s LEFT JOIN users u ON u.userId = s.userId WHERE staffId = ${id}`, (err, res) => {
        errFunction(err);

        if (res.length) {
            console.log("Found staff: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Staff.getAll = result => {
    sql.query("SELECT s.staffId, u.userId, s.name, s.phoneNum, u.username, u.userLevel FROM staff s LEFT JOIN users u ON u.userId = s.userId", (err, res) => {
        errFunction(err);

        console.log("Staff: ", res);
        result(null, res);
    });
};

Staff.updateById = (id, staff, result) => {
    sql.query(
        "UPDATE staff SET phoneNum = ?, name = ? WHERE staffId = ?",
        [
            staff.phoneNum,
            staff.name,
            id
        ],
        (err, res) => {
            errFunction(err);
            resAffectedFunction(res);

            console.log("Updated staff: ", { id: id, ...staff });
            result(null, { id: id, ...staff });
        }
    );
};

Staff.remove = (id, result) => {
    sql.query("DELETE FROM staff WHERE staffId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted staff with staffId: ", id);
        result(null, res);
    });
};

Staff.removeAll = result => {
    sql.query("DELETE FROM staff", (err, res) => {
        errFunction(err);

        console.log(`Deleted ${res.affectedRows} staff`);
        result(null, res);
    });
};

module.exports = Staff;