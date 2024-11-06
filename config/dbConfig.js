import dotenv from 'dotenv';
dotenv.config();



// copy pasted this from the example dbConfig file.
// we can uncomment and update as necessary once we create our own DB

console.log(`DB_SERVER: ${process.env.DB_SERVER}`);
console.log(`DB_DATABASE: ${process.env.DB_DATABASE}`);

export const config = {
  server: process.env.DB_SERVER || 'default_server_name',      // SQL Server name from the .env file
  database: process.env.DB_DATABASE,                          // Database name from the .env file
  options: {
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERT === 'true',  // Convert to boolean
  },
  authentication: {
    type: 'default',                                           // Use 'ntlm' for Windows Authentication / 'default' for SQL Server Authentication
    options: {
      userName: process.env.DB_USER,                          // Windows username from the .env file
      password: process.env.DB_PASSWORD,                      // No password for Windows Authentication
    },
  },
};




