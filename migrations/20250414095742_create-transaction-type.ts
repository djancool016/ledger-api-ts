import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('transaction_type')

    if(!exist){
        await knex.schema.createTable('transaction_type', (table) => {
            table.increments('id').primary();
            table.string('code', 4).notNullable();
            table.string('description').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transaction_type')
}

