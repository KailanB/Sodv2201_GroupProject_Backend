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

export const getPrograms = async (req, res) => {

    // select logic here

};

export const getProgramWithId = async (req, res) => {

    const { id } = req.params;
    // use req.params to find and return user data of user Id

};