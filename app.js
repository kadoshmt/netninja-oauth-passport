require('dotenv').config()

const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express();

/**
 *  Database Setup
 */
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// set up view engine
app.set('view engine', 'ejs')

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day in miliseconds
  keys: [process.env.COOKIE_KEY]
}));

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

//create home route
app.get('/', (req, res) => {
  res.render('home', {user: req.user});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App now listening for requests on port 3000')
});
