const iCloud = require("apple-icloud");
const moment = require("moment");
const prompt = require("prompt");

var session = {};
var username = "henninghaakonsen@gmail.com";
var password = "Gronnmo1909!";

exports.setupICloud = app => {
    var myCloud = new iCloud(session, username, password);

    myCloud.on("ready", function() {
        console.log("Ready Event!");
        if (myCloud.twoFactorAuthenticationIsRequired) {
            // Get the security code using node-prompt
            prompt.get(["Security Code"], async function(err, input) {
                if (err) return console.error(err);
                const code = input["Security Code"];
                // Set the security code to the instance
                myCloud.securityCode = code;
            });
        } else {
            // Now the 'ready' event fired but 'twoFactorAuthenticationIsRequired' is false, which means we don't need it (anymore)
            console.log("You are logged in completely!");
        }
    });

    const verifyIcloud = () => {
        if (myCloud.loggedIn) {
            return true;
        } else if (mycloud.twoFactorAuthenticationIsRequired) {
            return false;
        }

        return false;
    };

    app.get("/icloud/collections", async (req, res) => {
        if (!verifyIcloud()) {
            res.status(403).send("Unauthorized");
        }

        const collections = await myCloud.Calendar.getCollections();
        res.status(200).send(collections);
    });

    app.get("/icloud/events", async (req, res) => {
        if (!verifyIcloud()) {
            res.status(403).send("Unauthorized");
        } else {
            const fromDate = req.query.fromDate
                ? moment(req.query.fromDate)
                : moment();
            const toDate = req.query.toDate
                ? moment(req.query.toDate)
                : moment().add(4, "weeks");

            const events = await myCloud.Calendar.getEvents(
                fromDate.format("YYYY-MM-DD"),
                toDate.format("YYYY-MM-DD")
            );
            res.status(200).send(
                events.filter(
                    event =>
                        event.guid === "C334D8CA-4A62-4721-9201-A8FAAA8D9405"
                )
            );
        }
    });

    app.get("/icloud/security", (req, res) => {
        const code = req.headers["code"];
        myCloud.securityCode = code;

        res.status(200).send("OK");
    });
};
