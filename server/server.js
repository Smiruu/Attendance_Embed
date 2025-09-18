import authenticationRoutes from './apps/authentication/authenticationRoutes.js';

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

//Routes
app.use('/api/auth', authenticationRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});