import { config } from 'dotenv';
import { Knex } from 'knex';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
config({ path: path.resolve(__dirname, `../.env.${env}`) });

const {DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT} = process.env

const knexConfig: { [key: string] : Knex.Config} = {
    development: {
        client: 'pg',
        connection: {
          host: DB_HOST,
          user: DB_USER,
          password: DB_PASSWORD,
          database: DB_DATABASE,
          port: parseInt(DB_PORT || '5300', 10),
        },
        pool: { min: 2, max: 10 },
        migrations: { 
            directory: path.resolve(__dirname, '../migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, '../seeds')
        },
    },
    test: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, '../test.sqlite3')
        },
        useNullAsDefault: true,
        pool: { min: 1, max: 1 },
        migrations: { 
            directory: path.resolve(__dirname, '../migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, '../seeds')
        },
    },
};

export default knexConfig[env];