import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    app.get('*', (req, res) => {
        res.sendFile("/frontend/build/index.html");
    });
}

app.use(cors({ credentials:true, origin:'*' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 5000, ()=> console.log('Server running at port 5000'));
