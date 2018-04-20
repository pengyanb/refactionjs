const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");

const setup = require("./middlewares/frontendMiddleware");
const isDev = process.env.NODE_ENV !== "production";
const resolve = require("path").resolve;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("./routes/data.server.route"));

setup(app, {
  outputPath: resolve(process.cwd(), "build"),
  publicPath: "/"
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.listen(port, host, err => {
  if (err) {
    return console.error(err);
  }

  console.log(chalk.green(`Server started at ${host}:${port}`));
});
