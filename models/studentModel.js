
import { poolPromise } from '../config/db.js';
import sql from 'mssql';





export const modelGetAllStudents = async () => {

    const pool = await poolPromise;
    const result = await pool.request()
    .query(`SELECT StudentID, FirstName, LastName, Email, PhoneNumber, FORMAT(Birthday, 'dd-MM-yyyy') AS Birthday, s.ProgramID, p.Credential, d.Department, s.TermID, t.Term, s.UserName, StatusID 
        FROM Students s JOIN Terms t ON t.TermID = s.TermID 
        JOIN Programs p ON p.ProgramID = s.ProgramID
        JOIN Departments d on d.DepartmentID = p.DepartmentID`);

    return result.recordset;
    
};

export const modelGetStudentByEmail = async (email) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('email', sql.VarChar, email)
    .query('SELECT StudentID, FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, StatusID FROM Students WHERE Email = @email');

    return result.recordset[0];

};

export const modelGetStudentById = async (id) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT StudentID, FirstName, LastName, Email, PhoneNumber, FORMAT(Birthday, 'dd-MM-yyyy') AS Birthday, s.ProgramID, d.Department, p.Credential, s.TermID, t.Term, UserName, s.StatusID, Status FROM Students s 
        JOIN Terms t ON s.TermID = t.TermID
        JOIN Programs p ON p.ProgramID = s.ProgramID
        JOIN Departments d ON p.DepartmentID = d.DepartmentID 
        JOIN Status st ON st.StatusID = s.StatusID
        WHERE StudentID = @id`);

    return result.recordset[0];



};


export const modelCreateStudent = async (FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password, StatusID) => {
    
    const pool = await poolPromise;
    await pool.request()
    .input('firstName', sql.VarChar, FirstName)
    .input('lastName', sql.VarChar, LastName)
    .input('email', sql.VarChar, Email)
    .input('phoneNumber', sql.VarChar, PhoneNumber)
    .input('birthday', sql.VarChar, Birthday)
    .input('programID', sql.Int, ProgramID)
    .input('termID', sql.Int, TermID)
    .input('userName', sql.VarChar, UserName)
    .input('password', sql.VarChar, Password)
    .input('statusID', sql.Int, StatusID)
    .query('INSERT INTO Students (FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password, StatusID) '
    + ' VALUES (@firstname, @lastName, @email, @phoneNumber, @birthday, @programID, @termID, @userName, @password, @statusID)');


};


export const modelUpdateStudent = async (FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password, StatusID, studentID) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('firstName', sql.VarChar, FirstName)
    .input('lastName', sql.VarChar, LastName)
    .input('email', sql.VarChar, Email)
    .input('phoneNumber', sql.VarChar, PhoneNumber)
    .input('birthday', sql.VarChar, Birthday)
    .input('programID', sql.Int, ProgramID)
    .input('termID', sql.Int, TermID)
    .input('userName', sql.VarChar, UserName)
    .input('password', sql.VarChar, Password)
    .input('statusID', sql.Int, StatusID)
    .input('id', sql.Int, studentID)
    .query('UPDATE Students SET FirstName = @firstname, LastName = @lastName, Email = @email, PhoneNumber = @phoneNumber, Birthday = @birthday, ProgramID = @programID, TermID = @termID, UserName = @userName, Password = @password, StatusID = @statusID '
    + ' WHERE StudentID = @id');
    
    return result;

};


// this is a separate pull as I figured passwords, encrypted or not, should not be getting returned with most requests.
export const modelGetStudentPasswordByID = async (id) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT Password FROM Students WHERE StudentID = @id');

    return result.recordset[0];

};


export const modelGetStudentPasswordByEmail = async (email) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT Password FROM Students WHERE Email = @email');

    return result.recordset[0];

};


export const modelDeleteStudent = async (id) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Students WHERE StudentID = @id');

    return result;
    
};




