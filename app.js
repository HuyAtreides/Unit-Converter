const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const timestampRoute = require("./route/timestamp");
const base64Route = require("./route/base64");
const urlRoute = require("./route/url");
const binaryRoute = require("./route/binary");

app.set("views", "./views/");
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "index.hbs",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use("/", timestampRoute);
app.use("/base64encodedecode", base64Route);
app.use("/urlencodedecode", urlRoute);
app.use("/binaryconverter", binaryRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening at port 3000");
});
