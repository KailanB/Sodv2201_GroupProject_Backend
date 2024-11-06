
import sql from 'mssql';
import { config } from '../config/dbConfig.js';

const connectToSQL = async () => {

    try {
        await sql.connect(config);
        sql.on('error', err => {
            console.error('SQL Error: ' + err);
        });
    }
    catch (err) {
        console.error('Error connecting to SQL Server: ' + err);
        throw new Error('Error connecting to SQL Server: ' + err);
    }
};

export const getCourses = async (req, res) => {

    try {
        await connectToSQL();
        const result = await sql.query('SELECT * FROM Courses');
        console.log(result);
        // can we add a res.status here or not necessary?
        res.json(result.recordset);
    }
    catch (err) {

        console.error('Error retrieving courses: ' + err);
        res.status(500).json({error: 'Failed to retrieve courses data'});
    }

};

export const getCoursesOfProgram = async (req, res) => {

    const { program } = req.params;
    // use req.params.program to find and return program specific courses

};

export const getCoursesOfUser = async (req, res) => {

    // use req.params.userId to find and return courses of user

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
