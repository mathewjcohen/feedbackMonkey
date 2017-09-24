const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

mongoose.Promise = global.Promise;

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleID: profile.id,
        name: profile.name.givenName
      }).save();
      done(null, user);
    }
  )
);
