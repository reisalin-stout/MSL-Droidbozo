import { options } from "./imports.js";

const delay = {
  Low: 1000,
  Medium: 500,
  High: 250,
};

let timerId;

function frame(callback) {
  timerId = setTimeout(() => {
    console.log("Delayed");
    callback();
    frame(callback);
  }, delay[options.application.performance]);
}

let callback = () => {};

export function tick(code) {
  if (code) {
    callback = code;
  }
  clearTimeout(timerId);
  frame(callback);
}
