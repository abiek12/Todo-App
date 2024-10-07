import express, { Application } from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRouter from './routes/authRoutes';
import projectRouter from './routes/projectRoutes';
import cors from 'cors';

dotenv.config(); 

const app: Application = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);

app.get('/',(req, res)=> {
    res.send("Welcome to Backend");
})

app.listen(PORT, ()=> console.log(`Server Running on Port ${PORT}`))

// Database Connection
connectDB()