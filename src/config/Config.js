import 'dotenv/config';
import { object, z } from 'zod';

const schema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET: z.string().min(32),
    JWT_ACCESS_TTL: z.string().default('15m'),
    JWT_REFRESH_TTL: z.string().default('7d'),
    ALLOWED_ORIGIN: z.string().default('*'),
});

class Config {
    #value;
    static #instance

    constructor() {
        if (Config.#instance) {
            return Config.#instance;
        }

        const parsed = schema.safeParse(process.env);
        if (!parsed.success) {
            console.error('❌ Invalid environment configuration:', parsed.error.flatten().fieldErrors);
            process.exit(1);
        }

        this.#value = object.freeze(parsed.data);
        Config.#instance = this;
    }

    static getInstance() {
        return Config.#instance ?? new Config();
    }

    /**
 * @param {
 *   'NODE_ENV' |
 *   'PORT' |
 *   'DB_HOST' |
 *   'DB_PORT' |
 *   'DB_NAME' |
 *   'DB_USER' |
 *   'DB_PASSWORD' |
 *   'JWT_ACCESS_SECRET' |
 *   'JWT_REFRESH_SECRET' |
 *   'JWT_ACCESS_TTL' |
 *   'JWT_REFRESH_TTL' |
 *   'ALLOWED_ORIGIN'
 * } key
 */
    get(key) {
        return this.#value[key];
    }

    getAll() {
        return this.#value;
    }
}

export const config = Config.getInstance();