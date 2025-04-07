import { knex } from 'knex';
import knexConfig from './knexfile'

// Inisialisasi koneksi database menggunakan knexConfig
const db = knex(knexConfig);

// Function to test the database connection
export const dbConnect = async () => {
    try {
        // Execute a simple query to check the connection
        await db.raw('SELECT 1');
        console.log(`Database ${knexConfig.client} Connected Successfully!`);
    } catch (error) {
        const err = error as Error;
        throw new Error(`Failed connect to database: ${err.message}`);
    }
};

export default db;