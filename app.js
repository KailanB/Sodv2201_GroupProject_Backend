import express from 'express';
import cookieParser from 'cookie-parser'; 
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import programRoutes from './routes/programRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

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
// import express from 'express';
// import cors from 'cors';



// // Enable CORS
// app.use(cors({
//   origin: 'http://localhost:3000', 
//   credentials: true // if you need to send cookies
// }));

// other middleware and routes
// ...


// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// resolving issues of access control
// had to add this in the back end code to allow access from the requesting server from port 3000
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Middleware
app.use(express.json());
app.use(cookieParser());   
app.use(express.urlencoded({ extended: true}));

// app.use(express.static('public')); // is this needed??

// this is from the example setup
// app.use('/api/v1', userRoutes);
// I am not sure why it is written /api/v1. Gonna ask.
app.use('/api', studentRoutes);
app.use('/api', courseRoutes);
app.use('/api', programRoutes);

app.use('/api', loginRoutes);
app.use('/api', adminRoutes);


// app.get('/', (req, res) => {
//  res.send('Hello, Class!');
// });
// app.listen(5000, () => {
//     console.log('Server is running on port 3000');
// });

app.listen(port, () => {
 console.log(`Server is running at http://localhost:${port}`);
});
