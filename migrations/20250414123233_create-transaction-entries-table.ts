import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('transaction_entries');
    
    if(!exist){
        await knex.schema.createTable('transaction_entries', (table) => {
            table.increments('id').primary();
            table.integer('transaction_type_id')
                .references('id')
                .inTable('transaction_type')
                .notNullable();
            table.integer('coa_id')
                .references('id')
                .inTable('coa')
                .notNullable();
            table.boolean('is_credit').notNullable()
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transaction_entries')
}

