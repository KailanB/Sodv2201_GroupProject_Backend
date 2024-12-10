import bcrypt from 'bcrypt'; 
import cookieParser from 'cookie-parser'; 

import { GetCookieValues } from '../utils/utilities.js';

import { modelGetAdminById } from '../models/adminModel.js';




export const getAdminByIdCookie = async (req, res) => {


    const user = GetCookieValues(req.cookies.token);
    try {
        const admin = await modelGetAdminById(user.id);
        return res.status(200).json(admin);
    }
    catch (err) {

        console.error('Error retrieving admin: ' + err);
        res.status(500).json({error: 'Failed to retrieve admin data'});
    }

};





