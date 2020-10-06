const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
// const passport = require("passport");
// require('./passport')(passport);
// const session = require("express-session");
// const cookieParser = require("cookie-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// app.use(passport.initialize());

app.use(cors());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/user.routes.js")(app);
require("./routes/aobe.routes.js")(app);
require("./routes/staff.routes.js")(app);
require("./routes/status.routes.js")(app);
require("./routes/incident.routes.js")(app);
require("./routes/messages.routes.js")(app);
require("./routes/incident_case.routes.js")(app);
require("./routes/aobe_locations.routes.js")(app);


// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});