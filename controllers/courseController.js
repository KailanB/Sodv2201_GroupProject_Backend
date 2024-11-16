
import sql from 'mssql';
import { connectToSQL } from './commonFunctions.js';

export const getCourses = async (req, res) => {

    try {
        await connectToSQL();
        const result = await sql.query('SELECT * FROM Courses');
        res.status(200).json(result.recordset);
    }
    catch (err) {

        console.error('Error retrieving courses: ' + err);
        res.status(500).json({error: 'Failed to retrieve courses data'});
    }

};

// all courses a user has registered to
export const getCoursesOfUser = async (req, res) => {
    
    const { id  } = req.params;
    //console.log(id);

    try {
        await connectToSQL();
        const result = await sql.query(
            `SELECT c.CourseID, c.CourseName, c.CourseCode, c.TermID, c.ProgramID, c.Description 
            FROM Courses c JOIN StudentCourses sc ON sc.CourseId = c.CourseID
            JOIN Students s ON s.StudentID = sc.StudentID
            WHERE s.StudentID = ${id}`);
        // use req.params.userId to find and return courses of user
        res.status(201).json(result.recordset);
    }
    catch (err) {

        console.error('Error retrieving user courses: ' + err);
        res.status(500).json({error: 'Failed to retrieve student course data'});
    }

};

export const createCourse = async (req, res) => {

    const { /* course deets */ } = req.body;

};

export const updateCourse = async (req, res) => {

    const { id  } = req.params;

    // use course id to find course in database and update

};

export const deleteCourse = async (req, res) => {

    const { id } = req.params;
    // use course id to find course in database and delete

};


export const getCoursesOfProgram = async (req, res) => {

    const { programId } = req.params;


    try {
        await connectToSQL();
        const result = await sql.query(
            `SELECT c.CourseID, c.CourseName, c.CourseCode, c.TermID, t.Term, c.ProgramID, c.Description, d.Department, p.Credential, FORMAT(p.StartDate, 'dd-MM-yyyy') AS 'Program Start', FORMAT(p.EndDate, 'dd-MM-yyyy') AS 'Program End' 
            FROM Courses c JOIN Programs p ON p.ProgramID = c.ProgramID
            JOIN Departments d ON d.DepartmentID = p.DepartmentID
            JOIN Terms t ON t.TermID = c.TermID
            WHERE c.ProgramID = ${programId}`);

        res.status(201).json(result.recordset);
    }
    catch (err) {

        console.error(`Error retrieving courses of program ID ${programId}: ` + err);
        res.status(500).json({error: 'Failed to retrieve program course data'});
    }

};