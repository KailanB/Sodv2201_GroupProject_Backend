import sql from 'mssql';
import { connectToSQL } from './commonFunctions.js';




export const getAdminWithEmail = async (Email) => {


    await connectToSQL();
    const result = await sql.query(`SELECT * FROM Admins
                                    WHERE Email = '${Email}'`);

    return result.recordset[0];

};

