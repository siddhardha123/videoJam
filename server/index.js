import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import educatorRoutes from './routes/educatorRoutes.js'
import meetingRoutes from './routes/meetingRoutes.js'
import dotenv from 'dotenv'
dotenv.config()
const PORT = 3001;
const app = express();

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/api/educators", educatorRoutes);
app.use("/api/meetings", meetingRoutes);

app.listen(PORT, () => {
    connect();
    console.log("server is running at ",PORT);
});