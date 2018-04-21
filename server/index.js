const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const resolve = require('path').resolve;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// attch route fles
app.use(require('./routes/data.server.route'));

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// host and port can be passed via cli
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

// listen to the endpoint if app is not running in test envrioment
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, host, (err) => {
    if (err) {
      return console.error(err);
    }

    console.log(chalk.green(`Server started at ${host}:${port}`));
  });
}

// export app for tests
module.exports = app;
