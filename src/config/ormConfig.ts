import { DATABASE_CONFIG } from './dotenv';
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"
import entities from '../entities';

export const config = () => {
  const ORMconfig: MysqlConnectionOptions = {
    type: 'mysql',
    ...DATABASE_CONFIG,
    entities,
    synchronize: false,
  }

  return ORMconfig;
}