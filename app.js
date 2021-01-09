const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = process.env.CONNECTION_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);