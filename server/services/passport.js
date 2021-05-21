import passport from "passport";
import keys from "../keys";
import passportGoogleOAuth2 from "passport-google-oauth20";

const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CALLBACK,
} = keys;

const GoogleStrategy = passportGoogleOAuth2.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: GOOGLE_OAUTH_CALLBACK,
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));