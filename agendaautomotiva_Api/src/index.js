const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

require('./app/controllers/clientController')(app);
require('./app/controllers/schedulingController')(app);
require('./app/controllers/employeeController')(app);


app.listen(3000);

console.log("Server listner in port 3000")