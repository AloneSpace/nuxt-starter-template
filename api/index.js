const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cookieParser(
    fs.readFileSync(`${process.cwd()}/api/utils/secret_key/public.key`, {
      encoding: "hex"
    })
  )
);

//* Import Route
const route_auth = require("./routes/auth.route");

//* Use Route
app.use("/auth", route_auth({ express }));

module.exports = app;
