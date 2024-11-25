
import { poolPromise } from '../config/db.js';
import sql from 'mssql';

export const modelGetAdminWithEmail = async (email) => {


    const pool = await poolPromise;
    const result = await pool.request()
    .input('email', sql.VarChar, email)
    .query('SELECT AdminId, FirstName, LastName, Email, PhoneNumber, Birthday, UserName, StatusID FROM Admins WHERE Email = @email');

    return result.recordset[0];


};


export const modelGetAdminPasswordByEmail = async (email) => {

    const pool = await poolPromise;
    const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT Password FROM Admins WHERE Email = @email');

    return result.recordset[0];

}

