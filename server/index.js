const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
mongoose.set("strictQuery", false);
require("dotenv").config();
const databaseConnect = require("./config/database");
const rootEndPoint = require("./config/endpoint");
const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,authorization', 
};
app.use(cors(corsOptions));

//Data Base Funtion 
databaseConnect();

const adminRoute=require("./routes/admin")

const routes = [
    {
      path: `${rootEndPoint}/admin/`,
      func: adminRoute,
    },
   
  ];
  routes.forEach(({ path, func }) => {
    app.use(path, func);
  });
  app.get(`${rootEndPoint}`, (req, res) => {
    res.send("WOrking Tree");
  });
  app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.listen(process.env.PORT, (port) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
