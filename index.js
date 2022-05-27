const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/model');

// mongoose.connect('MONGODB_URI=mongodb+srv://amit:x4nWPWtq4WA3dm2I@cluster0.xgi87.mongodb.net/firstdb?retryWrites=true&w=majority', { useMongoClient: true });
// mongoose.connection.on('error', error => console.log(error) );
// mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://amit:x4nWPWtq4WA3dm2I@cluster0.xgi87.mongodb.net/firstdb?retryWrites=true&w=majority/passport-jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

require('./auth/auth');


// const routes = require('./routes/routes');
const routes = require('./routes/route')
const secureRoute = require('./routes/secure-routes');
const { verifyJwt } = require('./Middleware/jwtMiddleware');

const app = express();
app.get("/", (req,res)=> {
  res.send("hello")
  
})


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', verifyJwt, secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});