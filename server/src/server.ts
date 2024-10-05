import express, { Application } from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config(); 

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/project", require('./routes/projectRoutes'));

app.get('/',(req, res)=> {
    res.send("Welcome to Backend");
})

app.listen(PORT, ()=> console.log(`Server Running on Port ${PORT}`))

// Database Connection
connectDB()