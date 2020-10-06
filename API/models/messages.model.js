const sql = require("./db.js");

const Messages = function(messages) {
    this.messageId      = messages.messageId;
    this.message        = messages.message;
    this.readState      = messages.readState;
    this.senderId       = messages.senderId;
    this.recepientId    = messages.recepientId;
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

Messages.create = (newMessages, result) => {
    sql.query("INSERT INTO messages SET ?", newMessages, (err, res) => {
        errFunction(err);

        console.log("created Messages: ", { id: res.insertId, ...newMessages });
        result(null, { id: res.insertId, ...newMessages });
    });
};

Messages.findById = (id, result) => {
    sql.query(`SELECT * FROM messages WHERE messageId = ${id}`, (err, res) => {
        errFunction(err);

        if (res.length) {
            console.log("Found message: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Messages.getAll = result => {
    sql.query("SELECT * FROM messages", (err, res) => {
        errFunction(err);

        console.log("Message: ", res);
        result(null, res);
    });
};

Messages.updateById = (id, result) => {
    sql.query(
        "UPDATE messages SET message = ?, readState = ? WHERE messageId = ?",
        [
            messages.message,
            messages.readState,
            messages.messageId
        ],
        (err, res) => {
            errFunction(err);
            resAffectedFunction(res);

            console.log("Updated messages: ", { id: id, ...messages });
            result(null, { id: id, ...messages });
        }
    );
};

Messages.remove = (id, result) => {
    sql.query("DELETE FROM messages WHERE messageId = ?", id, (err, res) => {
        errFunction(err);
        resAffectedFunction(res);

        console.log("Deleted message with messageId: ", id);
        result(null, res);
    });
};

Messages.removeAll = result => {
    sql.query("DELETE FROM messages", (err, res) => {
        errFunction(err);

        console.log(`Deleted ${res.affectedRows} messages`);
        result(null, res);
    });
};

module.exports = Messages;