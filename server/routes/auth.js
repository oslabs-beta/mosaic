import express from "express";
import passport from "passport";

const router = express.Router();

// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // res.redirect('/profile');
    res.redirect('/auth');
  }
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.send(req.user);
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
})

export default router;