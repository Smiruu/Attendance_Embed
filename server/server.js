import authenticationRoutes from './apps/authentication/authenticationRoutes.js';
import profRoutes from './apps/prof/profRoutes.js';
import studentRoutes from './apps/student/studentRoutes.js'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from './middleware/errorHandler.js';

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
app.use('/api/professor', profRoutes)
app.use('/api/student/', studentRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});