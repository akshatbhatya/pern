import { db } from "../config/database.js";


class BaseRepository{
    constructor(table){
        this.table =table
        this.db =db
    }

    async findById(id){
        const {rows}=  await this.db.query(`SELECT * FROM ${this.table} where id =$1`,[id]);
        return rows[0]?? null;

    }

    async findByColumn(column,value){
        const {rows}= await this.db.query(`SELECT * FROM ${this.table} WHERE ${column} =$1 limit 1`,[value]);
        return rows[0] ?? null;
    }

    async create(data){
        const keys= Object.keys(data);
        const values =Object.values(data);

        const placeholders= keys.map((__,i)=>`$${i+1}`).join(', ');
        const {rows} = await this.db.query(`INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders}) * RETURNING *`,[values]);
        return rows[0] ?? null;
    }

    async findAll(){
        const {rows}= await this.db(`SELECT * FROM ${this.table} ORDER BY Created_at DESC`)
        return rows[0] ?? null;

    }

     async deleteById(id) {
        await this.db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
    } 
}

export const BaseRepository = new BaseRepository();