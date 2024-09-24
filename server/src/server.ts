import express, { Application } from 'express'
import dotenv from 'dotenv';

dotenv.config(); 

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

app.get('/',(req, res)=> {
    res.send("Welcome to Backend");
})

app.listen(PORT, ()=> console.log(`Server Running on Port ${PORT}`))

// Database Connection
