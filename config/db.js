import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

console.log(`DB_SERVER: ${process.env.DB_SERVER}`);
console.log(`DB_DATABASE: ${process.env.DB_DATABASE}`);

const dbConfig = {

    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD, 
    server: process.env.DB_SERVER || 'default_server_name', 
    database: process.env.DB_DATABASE,  
    options: {
        encrypt: true,   
        trustServerCertificate: true
    },
    authentication: {
        type: 'default',  
    }
};

export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch((err) => console.log('Database Connection Failed - ', err));

