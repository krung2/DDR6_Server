import 'dotenv/config';

const getValue = (key: string): string => {

  const value = process.env[key];

  if (value === undefined) {

    throw new Error(`${key} enviroment must be defined`);
  }

  return value;
}

export const PORT = getValue('PORT');

export const DATABASE_CONFIG = {
  host: getValue('DATABASE_HOST'),
  // tslint:disable-next-line: radix
  port: parseInt(getValue('DATABASE_PORT')),
  username: getValue('DATABASE_USERNAME'),
  password: getValue('DATABASE_PASSWORD'),
  database: getValue('DATABASE_NAME'),
};

export const API_KEY = getValue('API_KEY');

export const SERVER = {
  DAUTH: getValue('SERVER_DAUTH'),
  OPENAPI: getValue('SERVER_OPENAPI'),
}

export const CLIENT = {
  ID: getValue('CLIENT_ID'),
  SECRET: getValue('CLIENT_SECRET'),
}