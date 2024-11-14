
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

    const { program } = req.params;
    // use req.params.program to find and return program specific courses

};