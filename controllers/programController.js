

import sql from 'mssql';
import { connectToSQL } from './commonFunctions.js';


export const getPrograms = async (req, res) => {

    try {
        await connectToSQL();
        const result = await sql.query('SELECT * FROM Programs');
        res.status(200).json(result.recordset);
    }
    catch (err) {

        console.error('Error retrieving programs: ' + err);
        res.status(500).json({error: 'Failed to retrieve program data'});
    }

};

export const getProgramWithId = async (req, res) => {

    const { id } = req.params;

    try {
        await connectToSQL();
        const result = await sql.query(
            `SELECT *
            FROM Programs
            WHERE ProgramID = ${id}`);
        res.status(201).json(result.recordset);
    }
    catch (err) {

        console.error('Error retrieving program data: ' + err);
        res.status(500).json({error: 'Failed to retrieve program data'});
    }

};