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
import { ICoa } from "./models/ICoa";
import { CoaRepo } from "./repositories/CoaRepo";


const container = new Container();

// Bind database instance to the container
container.bind<Knex>("Knex").toConstantValue(db);

// Bind account related service
container.bind<ICrudRepo<IAccount>>("AccountRepo").to(AccountRepo);
container.bind<IAccountService>("AccountService").to(AccountService);
container.bind<IAccountController>("AccountController").to(AccountController);

// Bind coa related service
container.bind<ICrudRepo<ICoa>>("CoaRepo").to(CoaRepo)

export { container }