const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

require('dotenv').config();

console.log('Starting server.js...');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

console.log('Before initializing MongoDB connection...');

mongodb.initDb((err, mongodb) => {
  console.log('Entered mongodb.initDb callback');
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

console.log('After calling mongodb.initDb (this should print immediately if not blocked)');