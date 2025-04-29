import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'COGGIUK\\SQLEXPRESS',
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 30000
  }
};

const pool = new sql.ConnectionPool(config);

const poolPromise = pool.connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.error('Database Connection Failed:', err));

export default pool;
export { sql, poolPromise };