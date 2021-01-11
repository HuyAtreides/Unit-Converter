const express = require("express");
const router = express.Router();

let base64Result = "";
let inputText = "";
router.get("/", (req, res) => {
  res.render("./pages/converter", {
    base64: true,
    timestamp: false,
    title: "Base64 Encode/Decode",
    base64Result: base64Result,
    inputText: inputText,
  });
});

router.post("/encode", (req, res) => {
  try {
    const buffer = Buffer.from(req.body.text);
    base64Result = buffer.toString("base64");
    inputText = req.body.text;
  } catch (e) {
    base64Result = e.toString();
  }
  res.redirect("/base64encodedecode");
});

router.post("/decode", (req, res) => {
  try {
    const buffer = Buffer.from(req.body.text, "base64");
    base64Result = buffer.toString("ascii");
    inputText = req.body.text;
  } catch (e) {
    base64Result = e.toString();
  }
  res.redirect("/base64encodedecode");
});

module.exports = router;
