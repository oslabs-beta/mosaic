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

const User = mongoose.model('users');
const GoogleStrategy = passportGoogleOAuth2.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  // const existingUser = await User.findById(user.id);
  // done(null, existingUser);
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: GOOGLE_OAUTH_CALLBACK,
  },
  async (accessToken, refreshToken, profile, done) => {
    const {
      id,
      name: {
        givenName,
        familyName,
      },
      emails,
    } = profile;

    try {
      const existingUser = await User.findOne({googleId: id});
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUserData = {
          googleId: id,
          firstName: givenName,
          lastName: familyName,
          email: emails[0].value,
        };
        try {
          const newUser = await new User(newUserData).save();
          done(null, newUser);
        } catch(e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
));