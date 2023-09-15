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

export const logger = {
  log: (messsage, severity = "INFO") => {
    const currentTime = getTime();
    console.log(`[${currentTime}] [${severity}] ${messsage}`);
  },
};
