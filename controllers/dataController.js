import {

    modelGetAllTerms,
    modelGetAllPrograms,
    modelGetAllDepartments

} from '../models/dataModel.js';





export const getAllTerms = async (req, res) => {

    
    try {

        const terms = await modelGetAllTerms();
        return res.status(201).json(terms);
    }
    catch (err) {

        console.error(`Error retrieving terms` + err);
        return res.status(500).json({error: 'Failed to retrieve terms'});
    }

};


export const getAllPrograms = async (req, res) => {

    
    try {

        const programs = await modelGetAllPrograms();
        return res.status(201).json(programs);
    }
    catch (err) {

        console.error(`Error retrieving programs` + err);
        return res.status(500).json({error: 'Failed to retrieve programs'});
    }

};



// controller routes for input and dropdown menu data 
export const getAllDepartments = async (req, res) => {

    
    try {

        const departments = await modelGetAllDepartments();
        return res.status(201).json(departments);
    }
    catch (err) {

        console.error(`Error retrieving departments` + err);
        return res.status(500).json({error: 'Failed to retrieve departments'});
    }

};