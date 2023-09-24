const express = require('express');
var cors = require("cors");
const bodyParser = require('body-parser');
const login = require('./routes/login');



const mongoose = require('./config/mongoose');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', login);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
