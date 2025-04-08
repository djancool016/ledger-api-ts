import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('account');
    
    if(!exist){
        await knex.schema.createTable('account', (table) => {
            table.increments('id').primary();
            table.string('description').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('account')
}

