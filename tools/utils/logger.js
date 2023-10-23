import chalk from "chalk";

import { SEVERITY_ERROR, SEVERITY_INFO, SEVERITY_WARN } from "../constants.js";

function getTime() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  var dateTime = hour + ":" + minute + ":" + second;
  return dateTime;
}

const info = chalk.cyan;
const warn = chalk.yellow;
const error = chalk.red;

export const logger = {
  log: (messsage, severity = SEVERITY_INFO) => {
    const currentTime = getTime();

    let severityText = "";
    switch (severity) {
      default:
      case SEVERITY_INFO:
        severityText = info(severity);
        break;
      case SEVERITY_WARN:
        severityText = warn(severity);
        break;
      case SEVERITY_ERROR:
        severityText = error(severity);
        break;
    }

    console.log(`[${currentTime}] [${severityText}] ${messsage}`);
  },
};
