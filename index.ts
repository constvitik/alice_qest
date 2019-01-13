"use strict"

import express from "express";
import { createResponse } from "./src/createResponse";
import { parseRequest } from "./src/parseRequest";
import { commandDefinitions } from "./src/stepDefinitions";


const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

let
    userStates = {};

app.post('/', function (req, res) {
    let
        userState = userStates[req.body.session.user_id];
    if (req.body.session.new === true) {
        if (!userState) {
            userState = commandDefinitions["New"];
        } else {
            userState = commandDefinitions["Old"];
        }
    }
    else {
    userState = parseRequest({ command: req.body.request.original_utterance, userState });
    res.json(createResponse(req, userState));
    userStates[req.body.session.user_id] = userState;
}});

app.get('/hello', function (req, res) {
    res.send("test6");
})

app.use('*', function (req, res) {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});