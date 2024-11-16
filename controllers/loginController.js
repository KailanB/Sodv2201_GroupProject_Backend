import sql from 'mssql';
import { connectToSQL } from './commonFunctions.js';



export const login = async (req, res) => {

    const { Email } = req.body;

    // we will probably need to add !Email OR !Password here
    if(!Email)
    {
        
        return res.status(400).json({message: "Email is required"});
    }
    try {
        await connectToSQL();
        
        let EmailAdmin;
        let EmailStudent;
        //use SP to check both student and admin data for matching email
        const result = await sql.query(`EXEC Login '${Email}', ${EmailAdmin}, '${EmailStudent}'`);

        EmailStudent = result.recordset[0].EmailStudent
        EmailAdmin = result.recordset[0].EmailAdmin

        // equates to one day
        const mSeconds = 1000;
        const seconds = 60;
        const minutes = 60;
        const hours = 24;

        if(EmailStudent)
        {

            res.cookie('Email', EmailStudent, {maxAge: hours * minutes * seconds * mSeconds}); 
            console.log(`Student ${EmailStudent} logged in successfully`);

            return res.status(200).json({success: true, email: EmailStudent});
            
        }
        else if(EmailAdmin)
        {

            res.cookie('Email', EmailAdmin, {maxAge: hours * minutes * seconds * mSeconds});
            // we might only need the admin cookie true here instead of both email and admin check - we shall see
            res.cookie('Admin', 1, {maxAge: hours * minutes * seconds * mSeconds});
            console.log(`Admin ${EmailAdmin} logged in successfully`);

            return res.status(200).json({success: true, email: EmailAdmin});
        }
        else
        {
            return res.status(400).json({error: "Error retrieving email"});
        }

        //res.status(200).json(result.recordset);
    }
    catch (err) {

        console.error(`Error finding student with email ${Email}: ` + err);
        res.status(500).json({error: `Error finding student with email ${Email}`});
    }


};

export const logout = async (req, res) =>{


    const { Email } = req.body;

    if (Email)
    {
        console.log("User Logged out of email ", Email);

        res.clearCookie('Email');
        res.clearCookie('Admin');

        return res.status(200).json({success: true, message: "Log out successful"});

    }
    else 
    {
        console.log("Log out attempt failed. User was not logged in or missing cookie data");

        res.status(500).json({success: false, message: "No user was logged in"})
    }


};


