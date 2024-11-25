
// import sql from 'mssql';
// import { connectToSQL } from './commonFunctions.js';

import {

    modelGetAllCourses,
    modelGetCoursesOfUser,
    modelCreateCourse,
    modelUpdateCourse,
    modelDeleteCourse,
    modelGetCoursesOfProgram
} from '../models/courseModel.js';

export const getCourses = async (req, res) => {

    try {
        const courses = await modelGetAllCourses();
        return res.status(201).json(courses);
    }
    catch (err) {

        console.error('Error retrieving courses: ' + err);
        return res.status(500).json({error: 'Failed to retrieve courses data'});
    }

};

// all courses a user has registered to
export const getCoursesOfUser = async (req, res) => {
    
    const { id  } = req.params;
    //console.log(id);

    try {
        const courses = await modelGetCoursesOfUser(id);
        // await connectToSQL();
        // const result = await sql.query(
        //     `SELECT c.CourseID, c.CourseName, c.CourseCode, c.TermID, c.ProgramID, c.Description 
        //     FROM Courses c JOIN StudentCourses sc ON sc.CourseId = c.CourseID
        //     JOIN Students s ON s.StudentID = sc.StudentID
        //     WHERE s.StudentID = ${id}`);
        // use req.params.userId to find and return courses of user
        return res.status(201).json(courses);
    }
    catch (err) {

        console.error('Error retrieving user courses: ' + err);
        return res.status(500).json({error: 'Failed to retrieve student course data'});
    }

};

// Create a new course
export const createCourse = async (req, res) => {
    const { CourseName, CourseCode, TermID, ProgramID, Description } = req.body;

    if (!CourseName || !CourseCode || !TermID || !ProgramID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // await connectToSQL();
        // const query = `
        //     INSERT INTO Courses (CourseName, CourseCode, TermID, ProgramID, Description)
        //     VALUES (@CourseName, @CourseCode, @TermID, @ProgramID, @Description)
        // `;
        const result = await modelCreateCourse(CourseName, CourseCode, TermID, ProgramID, Description);

        if(result.rowsAffected > 0)
        {
            return res.status(201).json({ message: 'Course created successfully' });

        }
        else
        {
            return res.status(500).json({message:  `Failed to create course`});
        }
        // const request = new sql.Request();
        // request.input('CourseName', sql.NVarChar, CourseName);
        // request.input('CourseCode', sql.NVarChar, CourseCode);
        // request.input('TermID', sql.Int, TermID);
        // request.input('ProgramID', sql.Int, ProgramID);
        // request.input('Description', sql.NVarChar, Description || null);
        // await request.query(query);


        
    } catch (err) {
        console.error('Error creating course: ' + err);
        return res.status(500).json({ error: 'Failed to create course' });
    }
};

// Update an existing course
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { CourseName, CourseCode, TermID, ProgramID, Description } = req.body;
    // use course id to find course in database and update

    if (!CourseName || !CourseCode || !TermID || !ProgramID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // await connectToSQL();
        // const query = `
        //     UPDATE Courses
        //     SET CourseName = @CourseName,
        //         CourseCode = @CourseCode,
        //         TermID = @TermID,
        //         ProgramID = @ProgramID,
        //         Description = @Description
        //     WHERE CourseID = @CourseID
        // `;
        // const request = new sql.Request();
        // request.input('CourseName', sql.NVarChar, CourseName);
        // request.input('CourseCode', sql.NVarChar, CourseCode);
        // request.input('TermID', sql.Int, TermID);
        // request.input('ProgramID', sql.Int, ProgramID);
        // request.input('Description', sql.NVarChar, Description || null);
        // request.input('CourseID', sql.Int, id);

        const result = await modelUpdateCourse(CourseName, CourseCode, TermID, ProgramID, Description, id);

        //const result = await request.query(query);
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course updated successfully' });
    } catch (err) {
        console.error('Error updating course: ' + err);
        return res.status(500).json({ error: 'Failed to update course' });
    }
};

// Delete a course
export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {

        const result = await modelDeleteCourse(id);

        // await connectToSQL();
        // const query = 'DELETE FROM Courses WHERE CourseID = @CourseID';
        // const request = new sql.Request();
        // request.input('CourseID', sql.Int, id);

        // const result = await request.query(query);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error('Error deleting course: ' + err);
        return res.status(500).json({ error: 'Failed to delete course' });
    }
};

export const getCoursesOfProgram = async (req, res) => {

    const { programId } = req.params;


    try {

        const programs = await modelGetCoursesOfProgram(programId);
        return res.status(201).json(programs);
    }
    catch (err) {

        console.error(`Error retrieving courses of program ID ${programId}: ` + err);
        return res.status(500).json({error: 'Failed to retrieve program course data'});
    }

};