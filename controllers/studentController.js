import sql from 'mssql';
import { connectToSQL } from './commonFunctions.js';


export const getStudents = async (req, res) => {

    try {
        await connectToSQL();
        const result = await sql.query('SELECT * FROM Students');
        res.status(200).json(result.recordset);
    }
    catch (err) {

        console.error('Error retrieving students: ' + err);
        res.status(500).json({error: 'Failed to retrieve student data'});
    }

};

export const getStudentWithId = async (req, res) => {

    const { studentId } = req.params;

    try {
        await connectToSQL();
        const result = await sql.query(`SELECT * FROM Students
                                        WHERE StudentID = ${studentId}`);
        res.status(200).json(result.recordset);
    }
    catch (err) {

        console.error('Error retrieving student: ' + err);
        res.status(500).json({error: 'Failed to retrieve student data'});
    }

};


export const createStudent = async (req, res) => {

    const { FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, 
        TermID, UserName, Password, StatusID } = req.body;

    // console.log(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, 
    //     TermID, UserName, Password, StatusID);
    const validationError = studentInputValidation(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password, StatusID);

    if(validationError)
    {
        return res.status(400).json({error: validationError})
    }
    else
    {
        try {
            await connectToSQL();
            await sql.query(`INSERT INTO Students (FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password, StatusID) VALUES ('${FirstName}', '${LastName}', '${Email}', '${PhoneNumber}', '${Birthday}', ${ProgramID}, ${TermID}, '${UserName}', '${Password}', ${StatusID})`);
            res.status(201).json({message: 'Student created successfully'});
        }
        catch (err) {
            console.error('Error creating student:', err); 
            res.status(500).json({error: 'Failed to create new student!'});
        }
    }

    


};

export const updateStudent = async (req, res) => {


    const { studentId } = req.params;
    
    const { FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, 
        TermID, UserName, Password, StatusID } = req.body;

    const validationError = studentInputValidation(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password, StatusID);

    
    if(validationError)
    {
        return res.status(400).json({error: validationError})
    }
    try 
    {
        await connectToSQL();
        const result = await sql.query(`UPDATE Students SET FirstName = '${FirstName}', LastName = '${LastName}', 
            Email = '${Email}', PhoneNumber = '${PhoneNumber}', Birthday = '${Birthday}', ProgramID = ${ProgramID}, 
            TermID = ${TermID}, UserName ='${UserName}', Password = '${Password}', StatusID = ${StatusID} 
            WHERE StudentID = ${studentId}`);
        if(result.rowsAffected[0] === 0)
        {
            return res.status(404).json({error: `Student with ID: ${studentId} Not found`})
        }
        else
        {
            res.json({message:  `Student with ID: ${studentId} updated successfully`});
        }
    }
    catch (err)
    {
        console.error('Error updating student:', err); 
        res.status(500).json({message:  `Failed to update student data`});
    }
    

};

export const patchStudent = async (req, res) => {


    const { studentId } = req.params;
    
    const { FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, 
        TermID, UserName, Password, StatusID } = req.body;


    try 
    {
        await connectToSQL();

        const currentStudentData = await sql.query(`SELECT * FROM Students WHERE StudentID = ${studentId}`);
        const currentStudent = currentStudentData.recordset[0];

        if(!currentStudent)
        {
            return res.status(404).json({error: 'Student record not found!'});
        }
        // **************************************************************************


        // HAVING MAJOR ISSUES WITH currentStudent.Birthday
        // the date that comes back from the query cannot be reinserted into the database IDK WHY! 
        // Will get back to this later!

        // console.log('test');
        // console.log(Date.parse(currentStudent.Birthday));
        // console.log(String(currentStudent.Birthday));
        const updatedFirstName = FirstName !== undefined ? FirstName : currentStudent.FirstName;
        const updatedLastName = LastName !== undefined ? LastName : currentStudent.LastName;
        const updatedEmail = Email !== undefined ? Email : currentStudent.Email;
        const updatedPhoneNumber = PhoneNumber !== undefined ? PhoneNumber : currentStudent.PhoneNumber;
        
        // const updatedBirthday = Birthday !== undefined ? Birthday : currentStudent.Birthday.slice(0, 10);
        //const updatedBirthday = Birthday !== undefined ? Birthday : String(currentStudent.Birthday);
        // ****************************************************************************************
        const updatedProgramID = ProgramID !== undefined ? ProgramID : currentStudent.ProgramID;
        const updatedTermID = TermID !== undefined ? TermID : currentStudent.TermID;
        const updatedUserName = UserName !== undefined ? UserName : currentStudent.UserName;
        const updatedPassword = Password !== undefined ? Password : currentStudent.Password;
        const updatedStatusID = StatusID !== undefined ? StatusID : currentStudent.StatusID;

        

        const validationError = studentInputValidation(updatedFirstName, updatedLastName, updatedEmail, updatedPhoneNumber, updatedBirthday, updatedProgramID, updatedTermID, updatedUserName, updatedPassword, updatedStatusID);


        console.log(updatedFirstName, updatedLastName, updatedEmail, updatedPhoneNumber, updatedBirthday, updatedProgramID, updatedTermID, updatedUserName, updatedPassword, updatedStatusID);
    
        if(validationError)
        {
            return res.status(400).json({error: validationError});
        }
        
        console.log(studentId);
        const result = await sql.query(`UPDATE Students SET FirstName = '${updatedFirstName}', LastName = '${updatedLastName}', 
            Email = '${updatedEmail}', PhoneNumber = '${updatedPhoneNumber}', Birthday = '${updatedBirthday}', ProgramID = ${updatedProgramID}, 
            TermID = ${updatedTermID}, UserName ='${updatedUserName}', Password = '${updatedPassword}', StatusID = ${updatedStatusID} 
            WHERE StudentID = ${studentId}`);

            // (`UPDATE Students SET FirstName = '${FirstName}', LastName = '${LastName}', 
            //     Email = '${Email}', PhoneNumber = '${PhoneNumber}', Birthday = '${Birthday}', ProgramID = ${ProgramID}, 
            //     TermID = ${TermID}, UserName ='${UserName}', Password = '${Password}', StatusID = ${StatusID} 
            //     WHERE StudentID = ${studentId}`)
            
        if(result.rowsAffected[0] === 0)
        {
            
            return res.status(404).json({error: `Student with ID: ${studentId} Not found`})
        }
        else
        {
            res.json({message:  `Student with ID: ${studentId} patched successfully`});
        }
    }
    catch (err)
    {
        //console.error('Error patching student:', err); 
        res.status(500).json({message:  `Failed to patch student data`});
    }
    

};

export const deleteStudent = async (req, res) => {

    const { studentId } = req.params;
    
    try 
    {
        await connectToSQL();
        const result = await sql.query(`DELETE FROM Students WHERE StudentID = ${studentId}`);
        if(result.rowsAffected[0] === 0)
        {
            return res.status(404).json({error: `Student data with ID: ${studentId} Not found`})
        }
        else
        {
            res.json({message:  `Student with ID: ${studentId} deleted successfully`});
        }
    }
    catch (err)
    {
        console.error('Error deleting student:', err); 
        res.json({message:  `Failed to delete student data`});
    }

};



function studentInputValidation(FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password, StatusID)
{
    if (!FirstName)
    {
        return 'Must input first name';
    }
    if (!LastName)
    {
        return 'Must input last name';
    }
    if (typeof FirstName !== 'string')
    {
        return 'Invalid first name';
    }
    if (typeof LastName !== 'string')
    {
        return 'Invalid first name';
    }
    if(!Email)
    {
        return 'Must have Email';
    }
    if(!PhoneNumber)
    {
        return 'Must have Phone number';
    }
    if(!Birthday)
    {
        return 'Must have birthday';
    }
    if(!ProgramID || isNaN(ProgramID))
    {
        return  'Invalid or missing ProgramID';
    }
    if(!TermID || isNaN(TermID))
    {
        return 'Invalid or missing TermID';
    }
    if (!UserName)
    {
        return 'Must choose a user name';
    }
    if (typeof UserName !== 'string')
    {
        return  'Invalid user name';
    }
    if (!Password)
    {
        return 'Must choose a password';
    }
    if (typeof Password !== 'string')
    {
        return 'Invalid password';
    }
    if (Password.length < 8)
    {
        return 'password must be at least 8 characters long';
    }
    if(!StatusID || isNaN(StatusID))
    {
        return 'Invalid or missing TermID';
    }
}
