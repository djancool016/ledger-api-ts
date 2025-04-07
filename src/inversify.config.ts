import db from "./db";
import { Container } from "inversify";
import { Knex } from "knex";


const container = new Container();

// Bind database instance to the container
container.bind<Knex>("Knex").toConstantValue(db);

export { container }