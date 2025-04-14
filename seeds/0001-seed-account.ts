import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("account").del();

    // Inserts seed entries
    await knex("account").insert([
        { id: 1, description: "Curent Asset" },
        { id: 2, description: "Fixed Asset" },
        { id: 3, description: "Equity" },
        { id: 4, description: "Revenue" },
        { id: 5, description: "Expanses" },
    ]);
};
