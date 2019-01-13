import { commandDefinitions } from "./stepDefinitions";
import { Request } from "express-serve-static-core";

export function createResponse(req: Request, { message, commands }) {
    console.log("message, commands", message, commands);
    const buttons = commands
        .map((commandId) => {
            return commandDefinitions[commandId];
        })
        .filter(commandDefinition => commandDefinition && commandDefinition.button)
        .map((commandDefinition) => {
            console.log("commandDefinition:", commandDefinition);
            return commandDefinition.button;
        });
    return {
        version: req.body.version,
        session: req.body.session,
        response: {
            text: message,
            buttons,
            end_session: false
        }
    };
}
