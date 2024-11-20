
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

// Create a new course
export const createCourse = async (req, res) => {
    const { CourseName, CourseCode, TermID, ProgramID, Description } = req.body;

    if (!CourseName || !CourseCode || !TermID || !ProgramID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await connectToSQL();
        const query = `
            INSERT INTO Courses (CourseName, CourseCode, TermID, ProgramID, Description)
            VALUES (@CourseName, @CourseCode, @TermID, @ProgramID, @Description)
        `;
        const request = new sql.Request();
        request.input('CourseName', sql.NVarChar, CourseName);
        request.input('CourseCode', sql.NVarChar, CourseCode);
        request.input('TermID', sql.Int, TermID);
        request.input('ProgramID', sql.Int, ProgramID);
        request.input('Description', sql.NVarChar, Description || null);

        await request.query(query);
        res.status(201).json({ message: 'Course created successfully' });
    } catch (err) {
        console.error('Error creating course: ' + err);
        res.status(500).json({ error: 'Failed to create course' });
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
        await connectToSQL();
        const query = `
            UPDATE Courses
            SET CourseName = @CourseName,
                CourseCode = @CourseCode,
                TermID = @TermID,
                ProgramID = @ProgramID,
                Description = @Description
            WHERE CourseID = @CourseID
        `;
        const request = new sql.Request();
        request.input('CourseName', sql.NVarChar, CourseName);
        request.input('CourseCode', sql.NVarChar, CourseCode);
        request.input('TermID', sql.Int, TermID);
        request.input('ProgramID', sql.Int, ProgramID);
        request.input('Description', sql.NVarChar, Description || null);
        request.input('CourseID', sql.Int, id);

        const result = await request.query(query);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ message: 'Course updated successfully' });
    } catch (err) {
        console.error('Error updating course: ' + err);
        res.status(500).json({ error: 'Failed to update course' });
    }
};

// Delete a course
export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        await connectToSQL();
        const query = 'DELETE FROM Courses WHERE CourseID = @CourseID';
        const request = new sql.Request();
        request.input('CourseID', sql.Int, id);

        const result = await request.query(query);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error('Error deleting course: ' + err);
        res.status(500).json({ error: 'Failed to delete course' });
    }
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