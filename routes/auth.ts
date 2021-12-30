var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const ihubController = require("./ihubController");

const GOOGLE_CLIENT_ID = '183628566117-h39cergc60dpenjq1n0sjokgro69961a.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken: any, refreshToken: any, profile: any, done: any) {
    console.log(profile);
    const user = ihubController.addUser({ 
        user_id: profile.id, 
        firstName: profile.name.givenName, 
        lastName: profile.name.familyName
      });
    console.log(user);
    return done(null, profile);
  }
));

passport.serializeUser((user: any, done: any) => {
  return done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  return done(null, user);
});