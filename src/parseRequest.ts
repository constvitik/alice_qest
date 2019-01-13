import { getStep, StepDefinition } from './stepDefinitions';

export function parseRequest({ command, userState }) {
  console.log("command, userState", command, userState);
  const { commands } = userState,
    result = commands
      .map((commandId) => getStep(commandId))
      .filter((stepDef) => {
        return stepDef && stepDef.button && command === stepDef.button.title;
      })[0];
  console.log("result", result);
  if (!result || result.continue === true) {
    return userState;
  }
  return result;
}
