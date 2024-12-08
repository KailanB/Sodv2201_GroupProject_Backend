import { poolPromise } from '../config/db.js';
import sql from 'mssql';


export const modelGetAllPrograms = async () => {

    const pool = await poolPromise;

    const result = await pool.request()
    .query('SELECT p.ProgramID, p.Credential, p.DepartmentID, d.Department, p.StartDate, p.EndDate, p.Length, p.Description, p.Fee, p.Code FROM Programs p JOIN Departments d ON d.DepartmentID = p.DepartmentID');

    return result.recordset;

};


export const modelGetAllProgramsWithId = async (id) => {

    const pool = await poolPromise;

    const result = await pool.request()
    .input('programId', sql.Int, id)
    .query('SELECT * FROM Programs WHERE ProgramID = @programId');

    return result.recordset[0];
   
};





