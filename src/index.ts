import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(
  cors({
    origin: 'https://localhost:8080',
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on port http://localhost:8080/');
});

const MONGODB_URL =
  'mongodb+srv://gelato:gelato@cluster0.e7vn9ee.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected successfully');
});

mongoose.connection.on('error', (error: Error) => console.error(error));

app.use('/', router());
