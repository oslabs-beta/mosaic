import express, { Router } from "express";
import middlewares from "../middlewares";

const {
  auth,
} = middlewares;

const router = express.Router();

router.get("/")
