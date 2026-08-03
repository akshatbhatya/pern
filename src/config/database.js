import pg from 'pg'

import { config } from './Config.js'

class Database {

        #pool;

        constructor() {
            this.#pool = pg.Pool({
                host: config.get("DB_HOST"),
                database: config.get("DB_NAME"),
                port: config.get("DB_PORT"),
                user: config.get("DB_USER"),
                password: config.get("DB_PASSWORD"),

                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 5000,

            });

            this.#pool.on('error', (err) => {
                console.error('Unexpected database pool error:', err);
            });

        }

        query(text, params) {
            return this.#pool.query(text, params);
        }

        async withTransaction(work) {
            const client = await this.#pool.connect();
            try {
                await client.query('BEGIN');
                const result = await work(client);
                await client.query('COMMIT');
                return result;
            } catch (err) {
                await client.query('ROLLBACK');
                throw err;
            } finally {
                client.release();
            }
        }

        async close() {
            await this.#pool.end();
        }


    }


export const db = new Database();