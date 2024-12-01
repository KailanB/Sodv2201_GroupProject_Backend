import bcrypt from 'bcrypt';  

//import sql from 'mssql';
// import { connectToSQL } from './commonFunctions.js';
import jwt from 'jsonwebtoken';
import { modelGetStudentByEmail, modelGetStudentPasswordByEmail } from '../models/studentModel.js';
import { modelGetAdminWithEmail, modelGetAdminPasswordByEmail } from '../models/adminModel.js';

// key for JWT signing 
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; 

export const login = async (req, res) => {

    
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }
    try {
        
        
        const student = await modelGetStudentByEmail(Email);
        const admin = await modelGetAdminWithEmail(Email);

        const studentPassword = await modelGetStudentPasswordByEmail(Email);
        const adminPassword = await modelGetAdminPasswordByEmail(Email);

        // If the student is found
        if (student && bcrypt.compareSync(Password, studentPassword.Password)) {
            
            // Generate a JWT token for the student
            const token = jwt.sign(
                { email: student.Email, role: 'student' },
                 JWT_SECRET,
                { expiresIn: '1d' });
            //console.log("token " + token);
            //console.log(JWT_SECRET);
            // Set the token in a cookie with httpOnly option for security
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            console.log("res cookie token: " + res.cookie.token);
            console.log(`Student ${student.Email} logged in successfully`);
            return res.status(200).json({ success: true, token });
        }
         // If the admin is found
        
         //bcrypt.compareSync(Password, adminPassword.Password)
         else if (admin && adminPassword.Password == Password) {
            // Generate a JWT token for the admin
            const token = jwt.sign({ email: admin.Email, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
            
            // got this line from the in class example 
            // Set the token in a cookie with httpOnly option for security
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            console.log(`Admin ${admin.Email} logged in successfully`);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(400).json({ error: "Error retrieving email" });
        }


    }
    catch (err) {

        console.error(`Error finding account with email ${Email}: ` + err);
        res.status(500).json({error: `Error finding account with email ${Email}`});
    }


};

// Logout handler - client will just delete the token
export const logout = async (req, res) => {
    console.log(req.cookies);
    console.log("User logged out");
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: "Logout successful" });
};



//I've tried this login code to use JWT tokens for authentication instead of cookies with raw data, burt commented out this part if you wanna 
//give a try, it's just the minot change but can improves security ensures the app works better.

//     try {
//         const student = await modelGetStudentByEmail(Email);
//         const admin = await modelGetAdminWithEmail(Email);

//         if (student) {
//             const studentPassword = await modelGetStudentPasswordByEmail(Email);

//             // Validate student's password
//             if (bcrypt.compareSync(Password, studentPassword.Password)) {
//                 // Generate a JWT token for the student
//                 const token = jwt.sign(
//                     { email: student.Email, role: 'student' },
//                     JWT_SECRET,
//                     { expiresIn: '1d' }
//                 );

//                 // Set the token in a secure cookie
//                 res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
//                 console.log(`Student ${student.Email} logged in successfully`);
//                 return res.status(200).json({ success: true, token });
//             }
//         }

//         if (admin) {
//             const adminPassword = await modelGetAdminPasswordByEmail(Email);

//             // Validate admin's password
//             if (bcrypt.compareSync(Password, adminPassword.Password)) {
//                 // Generate a JWT token for the admin
//                 const token = jwt.sign(
//                     { email: admin.Email, role: 'admin' },
//                     JWT_SECRET,
//                     { expiresIn: '1d' }
//                 );

//                 // Set the token in a secure cookie
//                 res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
//                 console.log(`Admin ${admin.Email} logged in successfully`);
//                 return res.status(200).json({ success: true, token });
//             }
//         }

//         // If no match found, return invalid credentials
//         return res.status(401).json({ error: "Invalid email or password" });
//     } catch (err) {
//         console.error(`Error finding account with email ${Email}: ` + err);
//         res.status(500).json({ error: `Error finding account with email ${Email}` });
//     }
// };





// We should be able to delete all of this but keeping it for reference for now
// DEAD OLD COOKIE CODE *******************************************************************

// let EmailAdmin;
// let EmailStudent;
// //use SP to check both student and admin data for matching email
// const result = await sql.query(`EXEC Login '${Email}', ${EmailAdmin}, '${EmailStudent}'`);
// EmailStudent = result.recordset[0].EmailStudent
// EmailAdmin = result.recordset[0].EmailAdmin
// equates to one day
// const mSeconds = 1000;
// const seconds = 60;
// const minutes = 60;
// const hours = 24;

// if(EmailStudent)
// {
//     res.cookie('Email', EmailStudent, {maxAge: hours * minutes * seconds * mSeconds}); 
//     console.log(`Student ${EmailStudent} logged in successfully`);
//     return res.status(200).json({success: true, email: EmailStudent});   
// }

// else if(EmailAdmin)
// {
//     res.cookie('Email', EmailAdmin, {maxAge: hours * minutes * seconds * mSeconds});
//     // we might only need the admin cookie true here instead of both email and admin check - we shall see
//     res.cookie('Admin', 1, {maxAge: hours * minutes * seconds * mSeconds});
//     console.log(`Admin ${EmailAdmin} logged in successfully`);
//     return res.status(200).json({success: true, email: EmailAdmin});
// }
// else
// {
//     return res.status(400).json({error: "Error retrieving email"});
// }
        //res.status(200).json(result.recordset);

// export const logout = async (req, res) =>{
//     const { Email } = req.body;
//     if (Email)
//     {
//         console.log("User Logged out of email ", Email);
//         res.clearCookie('Email');
//         res.clearCookie('Admin');
//         return res.status(200).json({success: true, message: "Log out successful"});
//     }
//     else 
//     {
//         console.log("Log out attempt failed. User was not logged in or missing cookie data");
//         res.status(500).json({success: false, message: "No user was logged in"})
//     }
// };



// END OF DEAD COOKIE CODE ***********************************************************************
