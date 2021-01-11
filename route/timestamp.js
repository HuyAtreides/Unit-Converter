const express = require("express");
const router = express.Router();

let conversion = false;
let timeZone = null;
let UTCTime = null;
let unixTime = null;

router.get("/", (req, res) => {
  const tmp = conversion;
  conversion = false;
  res.render("./pages/converter", {
    title: "TimeStamp Converter",
    timestamp: true,
    conversion: tmp,
    currentUnixTime: Math.floor(Date.now() / 1000),
    currentTimeZone: new Date(),
    currentUTCTime: new Date().toUTCString(),
    unixTime: unixTime,
    timeZone: timeZone,
    UTCTime: UTCTime,
  });
});

router.post("/", (req, res) => {
  if (!req.body.timestamp) {
    const { year, month, day, hour, minute, second } = req.body;
    const date = new Date(year, month - 1, day, hour, minute, second);
    UTCTime = date.toUTCString();
    timeZone = date;
    unixTime = Math.floor(date.getTime() / 1000.0);
  } else {
    const date = new Date(req.body.timestamp * 1000);
    UTCTime = date.toUTCString();
    timeZone = date;
    unixTime = Math.floor(date.getTime() / 1000.0);
  }
  conversion = true;
  res.redirect("/");
});

module.exports = router;
