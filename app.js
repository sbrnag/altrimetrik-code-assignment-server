const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "altrimetrik-code-assignment-server login and registration node api"
  );
});

// database connection
const dbURI = process.env.CONNECTION_URL;
const port = process.env.PORT || 3000;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
