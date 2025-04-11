import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const exist = await knex.schema.hasTable('coa')

    if(!exist){
        await knex.schema.createTable('coa', (table) => {
            table.increments('id').primary();
            table.integer('account_id').references('id').inTable('account').notNullable();
            table.integer('code').unique().notNullable();
            table.string('description').notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('acount')
}

