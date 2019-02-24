"use strict";

import express from "express";
import { createResponse } from "./src/createResponse";
import { parseRequest } from "./src/parseRequest";
import { commandDefinitions } from "./src/stepDefinitions";
import { getNextState } from './src/getNextState';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

let userStates = {};

app.post("/", function(req, res) {
  const userState = getNextState(req);
  console.log("res", createResponse(req, userState));
  res.json(createResponse(req, userState));
});

app.get("/hello", function(req, res) {
  console.log("hello");
  res.send("test10");
});

app.use("*", function(req, res) {
  console.log("404");
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log("Example app listening on port 30001!");
});
