import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogrouter from './routes/blog-routes';

const url = "mongodb+srv://admin:HByZhUAhis4BN6AH@cluster0.dmfgrir.mongodb.net/Blog?retryWrites=true&w=majority"
const app = express();

//mongodb password = HByZhUAhis4BN6AH
app.use(express.json()); // for parsing data
app.use("/api/user", router);
app.use("/api/blog", blogrouter);
mongoose.connect(url).then(() => app.listen(5000))
    .then(() => console.log("Successfully connected!"))
    .catch((err) => console.log(err));