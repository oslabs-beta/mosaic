import express from "express";
import passport from "passport";
import authenticationController from "../controllers/authenticationController";

const router = express.Router();

// PassportJS Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  authenticationController.saveUserSession,
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

router.get('/logout', authenticationController.logOutNClearUserSession, (req, res) => {
  // res.send(res.locals.user);
  res.redirect('http://localhost:3000/dashboard');
});

router.get('/current_user', authenticationController.getCurrentUser, (req, res) => {
  res.json(res.locals.user);
});

export default router;