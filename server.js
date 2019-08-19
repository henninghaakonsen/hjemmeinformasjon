const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 9000;
const { setupICloud } = require("./src/backend/icloud");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

setupICloud(app);

app.listen(port, () => {
    console.log(`Started server on ` + port);
});
