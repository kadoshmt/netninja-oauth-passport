const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  }) 
});

passport.use(
  new GoogleStrategy({
    // options for the Google strategy
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_KEY,    
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    // check if user already exists in our db
    User.findOne({googleId:profile.id}).then((currentUser) => {
      if(currentUser){
        // already have the user
        console.log('User is: ' + currentUser)
        done(null, currentUser);
      } else {
        // create a new user in our db
        new User({
          
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.picture
        }).save().then((newUser) => {
          console.log('New user created: ' + newUser)
          done(null, newUser);
        })
      }      
    })
    
  })
)
