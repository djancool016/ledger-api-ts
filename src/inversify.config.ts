import db from "./db";
import { Container } from "inversify";
import { Knex } from "knex";
import { ICrudRepo } from "./repositories/ICrudRepo";
import { IAccount } from "./models/IAccount";
import { AccountRepo } from "./repositories/AccountRepo";
import { AccountService } from "./services/AccountService";
import { IAccountController } from "./controllers/IAccountController";
import { AccountController } from "./controllers/AccountController";
import { IAccountService } from "./services/IAccountService";


const container = new Container();

// Bind database instance to the container
container.bind<Knex>("Knex").toConstantValue(db);

// Bind account related service
container.bind<ICrudRepo<IAccount>>("ICrudRepo").to(AccountRepo);
container.bind<IAccountService>("IAccountService").to(AccountService);
container.bind<IAccountController>("IAccountController").to(AccountController);

export { container }