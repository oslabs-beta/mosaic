import passport from "passport";
import passportGoogleOAuth2 from "passport-google-oauth20";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CALLBACK,
} = process.env;

// const User = mongoose.model('User');
const GoogleStrategy = passportGoogleOAuth2.Strategy;

passport.serializeUser((user, done) => {
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  // const existingUser = await User.findById(id);
  // done(null, existingUser);
  done(null, id);
});

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: GOOGLE_OAUTH_CALLBACK,
  },
  async (accessToken, refreshToken, profile, done) => {
    // const existingUser = await User.findOne({googleId: profile.id});
    // if (existingUser) {
    //   done(null, existingUser);
    // } else {
    const {
      id,
      name: {
        givenName,
        familyName,
      },
      emails,
    } = profile;
    const emailAddress = emails[0].value;
    console.log(profile);
    console.log(id, givenName, familyName, emailAddress);
    //   const newUser = await new User({googleId: profile.id}).save();
      // done(null, newUser);
    // }
    done(null, profile);
  }
));