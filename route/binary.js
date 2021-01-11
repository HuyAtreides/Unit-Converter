const express = require("express");
const router = express.Router();

let inputText = "";
let result = "";

const convertDecimal = (text, type) => {
  try {
    if (type === "bin-to-dec") return parseInt(text, 2);
    return (parseInt(text) >>> 0).toString(2);
  } catch (e) {
    return e.toString();
  }
};

const convertString = (text, type) => {
  const result = [];
  try {
    if (type === "str-to-bin") {
      Array.from(text).forEach((ch) => {
        result.push(ch.charCodeAt(0).toString(2));
      });
      return result.join(" ");
    }
    text.split(" ").forEach((bin) => {
      result.push(String.fromCharCode(parseInt(bin, 2)));
    });
    return result.join("");
  } catch (e) {
    return e.toString();
  }
};

router.get("/", (req, res) => {
  res.render("./pages/converter", {
    title: "Binary Converter",
    timestamp: false,
    base64: false,
    url: false,
    binary: true,
    inputText: inputText,
    result: result,
  });
});

router.post("/convert", (req, res) => {
  const { text, type } = req.body;
  if (/dec/.test(type)) result = convertDecimal(text, type);
  else result = convertString(text, type);
  inputText = text;
  res.redirect("/binaryconverter");
});

module.exports = router;
