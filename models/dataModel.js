import { poolPromise } from '../config/db.js';
import sql from 'mssql';



// get routes for input and dropdown menu data 
export const modelGetAllTerms = async () => {

    const pool = await poolPromise;
    const result = await pool.request()
    .query(`SELECT * FROM Terms`);

    return result.recordset;
};


export const modelGetAllPrograms = async () => {

    const pool = await poolPromise;
    const result = await pool.request()
    .query(`SELECT ProgramID, Credential FROM Programs`);

    return result.recordset;
};



export const modelGetAllDepartments = async () => {

    const pool = await poolPromise;
    const result = await pool.request()
    .query(`SELECT * FROM Departments`);

    return result.recordset;
};