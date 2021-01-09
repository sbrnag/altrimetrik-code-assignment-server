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

app.get("/", (req, res) => {
  res.send("altrimetrik-code-assignment-server login and registration node api");
});

// database connection
const dbURI = process.env.CONNECTION_URL;
const port = process.env.PORT || 3000;
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => app.listen(port))
//   .catch((err) => console.log(err));

app.listen(port,() => {
  console.log(`Server running at port `+port);
});

// routes
app.use(authRoutes);