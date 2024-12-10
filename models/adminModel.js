
import { poolPromise } from '../config/db.js';
import sql from 'mssql';

export const modelGetAdminWithEmail = async (email) => {


    const pool = await poolPromise;
    const result = await pool.request()
    .input('email', sql.VarChar, email)
    .query('SELECT AdminID, FirstName, LastName, Email, PhoneNumber, Birthday, UserName, StatusID FROM Admins WHERE Email = @email');

    return result.recordset[0];


};


export const modelGetAdminPasswordByEmail = async (email) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT Password FROM Admins WHERE Email = @email');

    return result.recordset[0];

};


export const modelGetAdminById = async (id) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT AdminId, FirstName, LastName, Email, PhoneNumber, FORMAT(Birthday, 'dd-MM-yyyy') AS Birthday, UserName, a.StatusID, Status FROM Admins a 
        JOIN Status s ON s.StatusID = a.StatusID 
        WHERE AdminID = @id`);

    return result.recordset[0];


};

