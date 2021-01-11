const express = require("express");
const router = express.Router();

let result = "";
let inputText = "";
router.get("/", (req, res) => {
  res.render("./pages/converter", {
    base64: false,
    url: true,
    timestamp: false,
    title: "URL Encode/Decode",
    result: result,
    inputText: inputText,
  });
});

router.post("/urlencode", (req, res) => {
  try {
    result = encodeURIComponent(req.body.text);
    inputText = req.body.text;
  } catch (e) {
    result = e.toString();
  }
  res.redirect("/urlencodedecode");
});

router.post("/urldecode", (req, res) => {
  try {
    result = decodeURIComponent(req.body.text);
    inputText = req.body.text;
  } catch (e) {
    result = e.toString();
  }
  res.redirect("/urlencodedecode");
});

module.exports = router;
