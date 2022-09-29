import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
console.log(path.join(__dirname, '/dist', 'index.html'));


if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static(path.join(__dirname, 'build')));


    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.use(cors({ credentials:true, origin:'*' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 5000, ()=> console.log('Server running at port 5000'));
