import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

// Routes Imports
import authRouter from "./routers/auth";
import projectRouter from "./routers/project";
import serviceRouter from "./routers/service";

// Models Imports
import "./models/db";
import "./models/EventModel";
import "./models/ProjectModel";
import "./models/ServiceModel";
import "./models/UserModel";
import "./services/passport";

// Environment Variables
dotenv.config();
const {SESSION_SECRET, COOKIE_KEY, MONGO_DB_URI} = process.env;
const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(cookieParser());
app.use(session({
  name: 'session-name',
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  keys: [COOKIE_KEY],
  store: MongoStore.create({
    mongoUrl: MONGO_DB_URI,
    mongoOptions: {
      // options for the connect method to parse the URI
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  }),
  cookie: {
    secure: false, // Switch "secure" back to true in production
    maxAge: 24*60*60*1000, 
    httpOnly: false, // Switch "httpOnly" back to true in production
    sameSite: false,
  }, 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/projects', projectRouter);
app.use('/service', serviceRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: `An error occurred - ${err}`},
  };
  const errorObj = {...defaultErr, ...err};
  console.log(errorObj.status, errorObj.message);
  return res.status(errorObj.status).send(errorObj.message.err);
});

const startServer = () => {
  app.listen(PORT);
  console.log(`App listening on port ${3000} 🚀🔥`)
};

startServer();
