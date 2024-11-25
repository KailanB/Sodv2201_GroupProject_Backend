

// import sql from 'mssql';
// import { connectToSQL } from './commonFunctions.js';

import {
    modelGetAllPrograms,
    modelGetAllProgramsWithId
} from '../models/programModel.js';


export const getPrograms = async (req, res) => {

    try {
        
        const programs = await modelGetAllPrograms();
        res.status(200).json(programs);
    }
    catch (err) {

        console.error('Error retrieving programs: ' + err);
        res.status(500).json({error: 'Failed to retrieve program data'});
    }

};

export const getProgramWithId = async (req, res) => {

    const { id } = req.params;

    try {
        const program = await modelGetAllProgramsWithId(id);
        return res.status(200).json(program);
    }
    catch (err) {

        console.error('Error retrieving program data: ' + err);
        res.status(500).json({error: 'Failed to retrieve program data'});
    }

};