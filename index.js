const { request, response } = require("express");
const express = require("express");
const app = express();

const Datastore = require("nedb");

const bcrypt = require("bcryptjs");

let SID;

app.listen(80, () => console.log("Connecet with Port:80"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database/content.db");
const loginlog = new Datastore("database/loginlog.db");
database.loadDatabase();
loginlog.loadDatabase();

app.post("/savedata", (request, response) => {

    console.log("Data get saved");
    const data = request.body;
    console.log(data);
    database.insert(data);
    response.json({ status: "success" });
});

app.post("/fetchdata", (request, response) => {

    const tocall = request.body;

    console.log("data get called: " + tocall.currentview)

    database.find({ window: tocall.currentview }, (err, data) => {
        response.json(data);
    })
});

app.post("/removedata", (request, response) => {

    const data = request.body;
    console.log("Try to remove data with ID: " + data._id);

    database.remove({ _id: data._id }, {}, function (err, numRemoved) {
        console.log(numRemoved)
        if (numRemoved === 0) {
            response.json({ status: "failed" });
        }
        if (numRemoved === 1) {
            response.json({ status: "success" });
        }
    });
});

app.get("/preview/news", async (request, response) => {
    let getarr = [];
    let toSend = [];

    database.find({ window: "news" }, (err, data) => {

        data.sort(function (a, b) {
            let keyA = new Date(a.timestemp);
            let keyB = new Date(b.timestemp);

            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        data.reverse();

        getarr = data;

        for (let i = 0; i < 3; i++) {
            toSend.push(getarr[i])
        }
        console.log("send data")
        console.log(toSend)
        response.send(toSend)
     })
});
app.get("/preview/trade", async (request, response) => {
    let getarr = [];
    let toSend = [];

    database.find({ window: "trade" }, (err, data) => {

        data.sort(function (a, b) {
            let keyA = new Date(a.timestemp);
            let keyB = new Date(b.timestemp);

            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        data.reverse();

        getarr = data;

        for (let i = 0; i < 3; i++) {
            toSend.push(getarr[i])
        }
        console.log("send data")
        console.log(toSend)
        response.send(toSend)
    })
});

app.post("/login", async (request, response) => {

    const data = request.body;
    console.log("Login Data:");
    console.log(data);

    if ((data.username === "tim") && (await bcrypt.compare(data.passwort, "$2b$10$mR08g4wG4mUogWneHnmC6uAjdYjoUuQ9IAhmsVYZkx3SbNJXO5fAq"))) {
        console.log("Login is valid");
        response.json({ status: true });
    }
    else {
        console.log("Login is invalid");
        response.json({ status: false });
    }
});

let validSessions = [];
app.post("/checkSession", (request, response) => {

    const data = request.body;
    console.log("data:")
    console.log(data)



    if (data.toCreate == true) {
        console.log("Session will be created")
        data.sid = sessionID(10);
        console.log("Session ID is: " + data.sid)
        validSessions.push(data.sid)
        response.json({ sessionStatus: true, sid: data.sid });
    }
    else if (data.toCreate == "remove") {
        for (let i = 0; i < validSessions.length; i++) {
            if (validSessions[i] == data.sid) {
                validSessions.splice(i, 1);
            }
        }
        response.json({ sessionStatus: false, sid: "-1" });
    }
    else {

        let foundSession = false
        for (let i = 0; i < validSessions.length; i++) {
            if (validSessions[i] == data.sid) {
                foundSession = true;
            }
        }
        if (foundSession) {
            response.json({ sessionStatus: true, sid: data.sid });
        }
        else {
            response.json({ sessionStatus: false, sid: "-1" });
        }
    }

    if (validSessions.length > 5) {
        console.log("Session will be deleted");
        validSessions.shift();
    }
    console.log("session IDs: " + validSessions);
});


function sessionID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
