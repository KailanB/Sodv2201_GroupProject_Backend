import bcrypt from 'bcrypt'; 
import cookieParser from 'cookie-parser'; 

import { GetCookieValues } from '../utils/utilities.js';

import { modelGetAdminById, modelCreateMessage, modelGetAllMessages } from '../models/adminModel.js';




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

export const sendMessage = async (req, res) => {

    const { FullName, Email, Message } = req.body;

    if (!FullName || !Email || !Message ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await modelCreateMessage(FullName, Email, Message);

        if(result.rowsAffected > 0)
        {
            return res.status(201).json({ message: 'Message sent successfully' });

        }
        else
        {
            return res.status(500).json({message:  `Failed to send message`});
        }

        
    } catch (err) {
        console.error('Error sending message: ' + err);
        return res.status(500).json({ error: 'Failed to send message' });
    }


};

export const getMessages = async (req, res) => {

    
    try {
        const messages = await modelGetAllMessages();
        return res.status(201).json(messages);
    }
    catch (err) {

        console.error('Error retrieving messages: ' + err);
        return res.status(500).json({error: 'Failed to retrieve message data'});
    }

};





