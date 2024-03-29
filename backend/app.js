const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

require("dotenv").config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

mongoose.connect(process.env.ADRESSE_MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("La connexion à mongoDB a réussi") )
  .catch(() => console.log("La connexion à mongoDB a échoué"));

const app = express();

app.use(helmet({
  crossOriginResourcePolicy : false       
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;     
