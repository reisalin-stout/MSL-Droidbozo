import { exec } from "./imports.js";

export function command(consoleCommand) {
  exec(consoleCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    console.log(`Executed: "${consoleCommand}"`);
    return;
  });
}

export async function asyncCommand(consoleCommand) {
  return new Promise((resolve, reject) => {
    exec(consoleCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}
