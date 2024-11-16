import express from 'express';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import programRoutes from './routes/programRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

// also took these from the example app.js file
//import path from 'path';
//import { fileURLToPath } from 'url';
//import { dirname } from 'path';


dotenv.config();


// I copied a bunch of the lines of code from the example file
// we can uncopy and add them as necessary and as we understand what we need
// const __filename = fileURLToPath(import.meta.url); // not sure what this does exacly
// const __dirname = dirname(__filename);


const app = express();
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// app.use(express.static('public')); // is this needed??

// this is from the example setup
// app.use('/api/v1', userRoutes);
// I am not sure why it is written /api/v1. Gonna ask.
app.use('/api', studentRoutes);
app.use('/api', courseRoutes);
app.use('/api', programRoutes);

app.use('/api', loginRoutes);


// app.get('/', (req, res) => {
//  res.send('Hello, Class!');
// });


app.listen(port, () => {
 console.log(`Server is running at http://localhost:${port}`);
});
