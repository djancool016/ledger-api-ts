import db from "./db";
import { Container } from "inversify";
import { Knex } from "knex";
import { AccountService } from "./services/AccountService";
import { AccountController } from "./controllers/AccountController";
import { ICoa } from "./models/ICoa";
import { CoaRepo } from "./repositories/CoaRepo";
import { CoaService } from "./services/CoaService";
import { ICrud } from "./types/ICrud";
import { IAccount } from "./models/IAccount";
import { AccountRepo } from "./repositories/AccountRepo";
import { ICrudRequest } from "./types/ICrudRequest";
import { CoaController } from "./controllers/CoaController";
import { ITransType } from "./models/ITransType";
import { TransTypeRepo } from "./repositories/TransTypeRepo";
import { TransTypeService } from "./services/TransTypeService";
import { TransTypeController } from "./controllers/TransTypeController";

const container = new Container();

// Bind database instance to the container
container.bind<Knex>("Knex").toConstantValue(db);

// Bind account related service
container.bind<ICrud<IAccount>>("AccountRepo").to(AccountRepo);
container.bind<ICrud<IAccount>>("AccountService").to(AccountService);
container.bind<ICrudRequest<IAccount>>("AccountController").to(AccountController);

// Bind coa related service
container.bind<ICrud<ICoa>>("CoaRepo").to(CoaRepo);
container.bind<ICrud<ICoa>>("CoaService").to(CoaService);
container.bind<ICrudRequest<ICoa>>("CoaController").to(CoaController);

// Bind transaction_type relate service
container.bind<ICrud<ITransType>>("TransTypeRepo").to(TransTypeRepo);
container.bind<ICrud<ITransType>>("TransTypeService").to(TransTypeService);
container.bind<ICrudRequest<ITransType>>("TransTypeController").to(TransTypeController);

export { container }