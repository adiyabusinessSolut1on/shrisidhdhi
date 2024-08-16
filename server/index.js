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
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (process.env.ALLOWED_DOMAINS.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type,authorization',
//   credentials: true,
// };
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,authorization',
  credentials: true,
};

app.use(cors(corsOptions));


//Data Base Funtion 
databaseConnect();


//Routes
const adminRoute=require("./routes/admin");
const userRoute=require("./routes/user");
const bannerRoute=require("./routes/banner");
const categoryRoute=require("./routes/category");
const productRoute=require("./routes/product");
const reviewRoute=require("./routes/review");
const blogRoute=require("./routes/blog")
const routes = [
    {
      path: `${rootEndPoint}/admin/`,
      func: adminRoute,
    },
    {
      path: `${rootEndPoint}/user/`,
      func: userRoute,
    },
    {
      path: `${rootEndPoint}/banner/`,
      func: bannerRoute,
    },
    {
      path: `${rootEndPoint}/category/`,
      func: categoryRoute,
    },
    {
      path: `${rootEndPoint}/product/`,
      func: productRoute,
    },
    {
      path: `${rootEndPoint}/review/`,
      func: reviewRoute,
    },
    {
      path: `${rootEndPoint}/blogs/`,
      func: blogRoute,
    },
  ];
  routes.forEach(({ path, func }) => {
    app.use(path, func);
  });
  app.get(`${rootEndPoint}`, (req, res) => {
    res.send("WOrking Tree");
  });
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.listen(process.env.PORT, (port) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
