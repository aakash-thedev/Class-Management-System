const express = require('express');
const app = express();
const port = 9000;
const db = require('./config/mongoose');

const routes = require('./routes');

app.use(express.urlencoded());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Class Managment System App listening on port ${port}!`)
});