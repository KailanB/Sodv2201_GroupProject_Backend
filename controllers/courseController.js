
// import sql from 'mssql';
// import { connectToSQL } from './commonFunctions.js';

import {

    modelGetAllCourses,
    modelGetCoursesOfUser,
    modelDeleteCourseOfUser,
    modelAddCourseOfUser,
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
    if(id !== 'undefined')
    {
        try {
            const courses = await modelGetCoursesOfUser(id);
            return res.status(201).json(courses);
        }
        catch (err) {
    
            console.error('Error retrieving user courses: ' + err);
            return res.status(500).json({error: 'Failed to retrieve student course data'});
        }
    }

    

};


export const addCourseOfUser = async (req, res) => {
    const { studentId, courseId  } = req.params;
    try 
    {
        
        const result = await modelAddCourseOfUser(studentId, courseId);
        if (result.rowsAffected === 0) 
        {
            return res.status(404).json({ error: 'Course not added' });
        }
        return res.status(200).json({ message: 'Course added successfully' });
    } 
    catch (err) 
    {
        console.error('Error adding course: ' + err);
        return res.status(500).json({ error: 'Failed to add course' });
    }


};

export const deleteCourseOfUser = async (req, res) => {
    
    const { studentId, courseId  } = req.params;
    
    try {
        const result = await modelDeleteCourseOfUser(studentId, courseId);
        
        if (result.rowsAffected === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error('Error deleting course: ' + err);
        return res.status(500).json({ error: 'Failed to delete course' });
    }

};

// Create a new course
export const createCourse = async (req, res) => {
    const { CourseName, CourseCode, TermID, ProgramID, Description } = req.body;

    if (!CourseName || !CourseCode || !TermID || !ProgramID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {

        const result = await modelCreateCourse(CourseName, CourseCode, TermID, ProgramID, Description);

        if(result.rowsAffected > 0)
        {
            return res.status(201).json({ message: 'Course created successfully' });

        }
        else
        {
            return res.status(500).json({message:  `Failed to create course`});
        }

        
    } catch (err) {
        console.error('Error creating course: ' + err);
        return res.status(500).json({ message: 'Failed to create course' });
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


