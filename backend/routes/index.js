import express from "express";
import { Login } from '../controllers/Users.js'
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const routes = express.Router();

router.get('/users', verifyToken, getUsers);
routes.post('/login', Login);
router.get('/token', refreshToken);

