

import bcrypt from 'bcrypt'; 

// import sql from 'mssql';
// import { connectToSQL } from './commonFunctions.js';

import {
    modelGetAllStudents,
    modelGetStudentByEmail,
    modelGetStudentById,
    modelCreateStudent,
    modelUpdateStudent,
    modelGetStudentPasswordByID,
    modelDeleteStudent

} from '../models/studentModel.js';


export const getStudents = async (req, res) => {

    try {

        const students = await modelGetAllStudents();
        return res.status(200).json(students);
    }
    catch (err) {

        console.error('Error retrieving students: ' + err);
        res.status(500).json({error: 'Failed to retrieve student data'});
    }

};

export const getStudentWithId = async (req, res) => {

    const { studentId } = req.params;

    try {
        const student = await modelGetStudentById(studentId);
        return res.status(200).json(student);
    }
    catch (err) {

        console.error('Error retrieving student: ' + err);
        res.status(500).json({error: 'Failed to retrieve student data'});
    }

};


export const getStudentWithEmail = async (Email) => {


    
    // await connectToSQL();
    // const result = await sql.query(`SELECT * FROM Students 
    //                                 WHERE Email = '${Email}'`);

    // return result.recordset[0];

};


export const createStudent = async (req, res) => {

    const { FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, 
        TermID, UserName, Password } = req.body;
    // student status is 1 and we shouldn't need to pass this value from front end
    // as we are not creating any admin accounts
    const StatusID = 1;
    const validationError = studentInputValidation(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password);

    if(validationError)
    {
        return res.status(400).json({error: validationError})
    }


    try
    {
        const checkEmailExists = await modelGetStudentByEmail(Email);

        if(checkEmailExists)
        {
            return res.status(500).json({error: 'Failed to create new student, email already in use!'});
        }
    }
    catch (err)
    {
        console.error('Error checking if email exists:', err); 
        res.status(500).json({error: 'Failed to create new student!'});
    }
        
    try {
        const HashedPassword = await bcrypt.hash(Password, 10); 

        await modelCreateStudent(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, HashedPassword, StatusID);
        res.status(201).json({message: 'Student created successfully'});
    }
    catch (err) {
        console.error('Error creating student:', err); 
        res.status(500).json({error: 'Failed to create new student!'});
    }


    


};

export const updateStudent = async (req, res) => {


    const { studentId } = req.params;
    
    const { FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, 
        TermID, UserName, Password } = req.body;

    const validationError = studentInputValidation(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password);

    const StatusID = 1;
    
    if(validationError)
    {
        return res.status(400).json({error: validationError})
    }


    try
    {  
        const checkEmailExists = await modelGetStudentByEmail(Email);
        // check if new email exists
        if(checkEmailExists)
        {
            // if new email exists in DB and does NOT belong to ID current user
            if(checkEmailExists.StudentID != studentId)
            {
                // return error
                return res.status(500).json({error: 'Failed to update student, email already in use!'});
            }
            
        }
    }
    catch (err)
    {
        console.error('Error checking if email exists:', err); 
        res.status(500).json({error: 'Failed to update student! Email in use!'});
    }


    try 
    {
        const HashedPassword = await bcrypt.hash(Password, 10); 

        // check that result to check if rows were affected
        const result = await modelUpdateStudent(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, HashedPassword, StatusID, studentId);
        if(result.rowsAffected > 0)
        {
            res.status(201).json({message:  `Student with ID: ${studentId} updated successfully`});
        }
        else
        {
            res.status(500).json({message:  `Failed to update student data, studentID ${studentId} not found`});
        }
        
    }
    catch (err)
    {
        console.error('Error updating student:', err); 
        res.status(500).json({message:  `Failed to update student data`});
    }
    

};

export const patchStudent = async (req, res) => {


    const { studentId } = req.params;
    
    const { FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, 
        TermID, UserName, Password } = req.body;

    try 
    {
        const currentStudent = await modelGetStudentById(studentId)
        // student status is 1
        const statusID = 1;
        
        // this uses a separate function especially made for pulling password data
        // in all other requests password data is not included
        const studentPassword = await modelGetStudentPasswordByID(studentId);

        if(!currentStudent)
        {
            return res.status(404).json({error: 'Student record not found!'});
        }
        

        const updatedFirstName = FirstName !== undefined ? FirstName : currentStudent.FirstName;
        const updatedLastName = LastName !== undefined ? LastName : currentStudent.LastName;
        const updatedEmail = Email !== undefined ? Email : currentStudent.Email;
        const updatedPhoneNumber = PhoneNumber !== undefined ? PhoneNumber : currentStudent.PhoneNumber;
        

        const updatedBirthday = Birthday !== undefined ? Birthday : currentStudent.Birthday;
        
        const updatedProgramID = ProgramID !== undefined ? ProgramID : currentStudent.ProgramID;
        const updatedTermID = TermID !== undefined ? TermID : currentStudent.TermID;
        const updatedUserName = UserName !== undefined ? UserName : currentStudent.UserName;
        const updatedPassword = Password !== undefined ? await bcrypt.hash(Password, 10) : studentPassword.Password;       
        const validationError = studentInputValidation(updatedFirstName, updatedLastName, updatedEmail, updatedPhoneNumber, updatedBirthday, updatedProgramID, updatedTermID, updatedUserName, updatedPassword);

        if(validationError)
        {
            return res.status(400).json({error: validationError});
        }
        

        try
        {
            // check if new email exists
            const checkEmailExists = await modelGetStudentByEmail(updatedEmail);
            
            // if new email exists in DB and does NOT belong to current user
            if(checkEmailExists)
            {
                if(checkEmailExists.Email != currentStudent.Email)
                {
                    // return error 
                    return res.status(500).json({error: 'Failed to patch student, email already in use!'});
                }
                
            }
        }
        catch (err)
        {
            console.error('Error checking if email exists:', err); 
            res.status(500).json({error: 'Failed to patch student, email in use!'});
        }

        try 
        {
        
            const result = await modelUpdateStudent(updatedFirstName, updatedLastName, updatedEmail, updatedPhoneNumber, updatedBirthday, updatedProgramID, updatedTermID, updatedUserName, updatedPassword, statusID, studentId);

            if(result.rowsAffected > 0)
            {
                res.json({message:  `Student with ID: ${studentId} updated successfully`});
            }
            else
            {
                res.status(500).json({message:  `Failed to update student data, studentID ${studentId} not found`});
            }
        }
        catch (err)
        {
            console.error('Error updating student in DB')
            res.status(500).json({message:  `Failed to update student data, studentID ${studentId}`});
        }
    }
    catch (err)
    {
        console.error('Error patching student:', err); 
        res.status(500).json({message:  `Failed to patch student data`});
    }
    

};

export const deleteStudent = async (req, res) => {

    const { studentId } = req.params;
    
    try 
    {
        const result = await modelDeleteStudent(studentId);
        if(result.rowsAffected > 0)
        {
            res.json({message:  `Student with ID: ${studentId} deleted successfully`});
        }
        else
        {
            res.status(500).json({message:  `Failed to delete student data, studentID ${studentId} not found`});
        }
    }
    catch (err)
    {
        console.error('Error deleting student:', err); 
        res.json({message:  `Failed to delete student data`});
    }

};



function studentInputValidation(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password)
{
    if (!FirstName)
    {
        return 'Must input first name';
    }
    if (!LastName)
    {
        return 'Must input last name';
    }
    if (typeof FirstName !== 'string')
    {
        return 'Invalid first name';
    }
    if (typeof LastName !== 'string')
    {
        return 'Invalid first name';
    }
    if(!Email)
    {
        return 'Must have Email';
    }
    if(!PhoneNumber)
    {
        return 'Must have Phone number';
    }
    if(!Birthday)
    {
        return 'Must have birthday';
    }
    if(!ProgramID || isNaN(ProgramID))
    {
        return  'Invalid or missing ProgramID';
    }
    if(!TermID || isNaN(TermID))
    {
        return 'Invalid or missing TermID';
    }
    if (!UserName)
    {
        return 'Must choose a user name';
    }
    if (typeof UserName !== 'string')
    {
        return  'Invalid user name';
    }
    if (!Password)
    {
        return 'Must choose a password';
    }
    if (typeof Password !== 'string')
    {
        return 'Invalid password';
    }
    if (Password.length < 8)
    {
        return 'password must be at least 8 characters long';
    }
    // if(!StatusID || isNaN(StatusID))
    // {
    //     return 'Invalid or missing TermID';
    // }
}
