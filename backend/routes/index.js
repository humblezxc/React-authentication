import express from "express";
import { Login } from '../controllers/Users.js'

const routes = express.Router();

routes.post('/login', Login);

