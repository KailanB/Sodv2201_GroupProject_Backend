import { poolPromise } from '../config/db.js';
import sql from 'mssql';


export const modelGetAllPrograms = async () => {

    const pool = await poolPromise;

    const result = await pool.request()
    .query('SELECT * FROM Programs');

    return result.recordset;

};


export const modelGetAllProgramsWithId = async (id) => {

    const pool = await poolPromise;

    const result = await pool.request()
    .input('programId', sql.Int, id)
    .query('SELECT * FROM Programs WHERE ProgramID = @programId');

    return result.recordset[0];
   
};





