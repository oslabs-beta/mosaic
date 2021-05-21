import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
// import "./models/UserModel";
import "./services/passport";

dotenv.config();

const {SESSION_SECRET, COOKIE_KEY} = process.env;

const PORT = 8080;
const app = express();

// const corsOptions = {
//   origin:'http://localhost:3000',
//   methods: 'GET',
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
  next();
});

app.use(cookieParser());
app.use(session({
  name: 'session-name',
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  keys: COOKIE_KEY,
  cookie: {maxAge: 24*60*60*1000},
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

app.get('/failed', (req, res) => {
  res.send('<h1>Log in Failed :(</h1>');
});

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
  req.user ? next(): res.sendStatus(401);
};

//Protected Route.
app.get('/profile', checkUserLoggedIn, (req, res) => {
  res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`)
});

//Logout
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

const startServer = () => {
  app.listen(PORT);
  console.log(`App listening on port ${3000} 🚀🔥`)
};

startServer();
