import { parseRequest } from "./parseRequest";
import { commandDefinitions } from "./stepDefinitions";

let userStates = {};
export function getNextState(req){
    let userState = userStates[req.body.session.user_id];
if (req.body.session.new === true) {
    if (!userState) {
      userState = commandDefinitions["New"];
    } else {
      userState = commandDefinitions["Old"];
    }
  } else {
    userState = parseRequest({
      command: req.body.request.original_utterance,
      userState
    });
    userStates[req.body.session.user_id] = userState;
  }
}