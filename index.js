const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors  = require("cors")
const multer = require("multer");



const UserModel = require('./model/model');
const database=require("./config/database")
require("dotenv").config()
const PORT = process.env.PORT || 5000;


database()

require('./auth/auth');




// const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
const upload = require('./routes/upload');
const category = require('./routes/category');
const { verifyJwt } = require('./Middleware/jwtMiddleware');
const getProduct =require('./routes/getproduct');

const app = express();

// app.use(express.json());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
// images=================



app.set('view engine', 'ejs')

app.use(cors({
  credentials:true,
  origin: '*'
}));


app.use("/product-image",express.static("public/images"))
app.use("/category-image",express.static("public/images"))

// app.use(cors({
//   origin:"http://localhost:3000",
//   method:['GET','POST']
// }))

app.get("/", (req,res)=> {
  // res.render('index.ejs', {})
  res.json({"message": "Welcome to India bazar. --------------------."})
  
})



// app.use('/product',upload);
const routes = require('./routes/route');


app.use('/upload', upload);
app.use('/api', routes);
app.use("/api/category",category)

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/api/user', verifyJwt, secureRoute);

app.use('/api',getProduct)

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, () => {
  console.log('Server started.')
});