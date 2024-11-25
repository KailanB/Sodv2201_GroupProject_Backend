
import { poolPromise } from '../config/db.js';
import sql from 'mssql';






export const modelGetAllCourses = async () => {

    const pool = await poolPromise;
    const result = await pool.request()
    .query('SELECT * FROM Courses');

    return result.recordset;
    
};


export const modelGetCoursesOfUser = async (id) => {


    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT c.CourseID, c.CourseName, c.CourseCode, c.TermID, c.ProgramID, c.Description 
        FROM Courses c JOIN StudentCourses sc ON sc.CourseId = c.CourseID 
        JOIN Students s ON s.StudentID = sc.StudentID WHERE s.StudentID = @id`)

    return result.recordset;

};


export const modelGetCoursesOfProgram = async (programId) => {


    const pool = await poolPromise;
    const result = await pool.request()
    .input('programId', sql.Int, programId)
    .query(`SELECT c.CourseID, c.CourseName, c.CourseCode, c.TermID, t.Term, c.ProgramID, c.Description, d.Department, p.Credential, FORMAT(p.StartDate, 'dd-MM-yyyy') AS 'Program Start', FORMAT(p.EndDate, 'dd-MM-yyyy') AS 'Program End' 
    FROM Courses c JOIN Programs p ON p.ProgramID = c.ProgramID
    JOIN Departments d ON d.DepartmentID = p.DepartmentID
    JOIN Terms t ON t.TermID = c.TermID
    WHERE c.ProgramID = @programId`);
    return result.recordset;

};


export const modelCreateCourse = async (CourseName, CourseCode, TermID, ProgramID, Description) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('CourseName', sql.NVarChar, CourseName)
    .input('CourseCode', sql.Int, CourseCode)
    .input('TermID', sql.Int, TermID)
    .input('ProgramID', sql.Int, ProgramID)
    .input('Description', sql.NVarChar, Description)
    .query('INSERT INTO Courses (CourseName, CourseCode, TermID, ProgramID, Description) ' 
        + 'VALUES (@CourseName, @CourseCode, @TermID, @ProgramID, @Description)');


    return result;

};


export const modelUpdateCourse = async (CourseName, CourseCode, TermID, ProgramID, Description, id) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('CourseName', sql.NVarChar, CourseName)
    .input('CourseCode', sql.Int, CourseCode)
    .input('TermID', sql.Int, TermID)
    .input('ProgramID', sql.Int, ProgramID)
    .input('Description', sql.NVarChar, Description)
    .input('id', sql.Int, id)
    .query('UPDATE Courses SET CourseName = @CourseName, CourseCode = @CourseCode, TermID = @TermID, ProgramID = @ProgramID, Description = @Description'
    + ' WHERE CourseID = @id');
    return result;
};



export const modelDeleteCourse = async (id) => {


    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Courses WHERE CourseID = @id')

    return result
};




