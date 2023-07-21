import express from 'express';
import mongoose from 'mongoose';
const url = "mongodb+srv://admin:HByZhUAhis4BN6AH@cluster0.dmfgrir.mongodb.net/Blog?retryWrites=true&w=majority"
const app = express();

//mongodb password = HByZhUAhis4BN6AH
mongoose.connect(url).then(() => app.listen(5000))
    .then(() => console.log("Successfully connected!"))
    .catch((err) => console.log(err));