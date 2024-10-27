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

export const getUsers = async (req, res) => {

    // select logic here

};

export const getUserWithId = async (req, res) => {

    const { id } = req.params;
    // use req.params to find and return user data of user Id

};


export const createUser = async (req, res) => {

    const { /* user deets */ } = req.body;

};

export const updateUser = async (req, res) => {

    const { id  } = req.params;

    // use course id to find course in database and update

};

export const deleteUser = async (req, res) => {

    const { id } = req.params;
    // use course id to find course in database and delete

};
