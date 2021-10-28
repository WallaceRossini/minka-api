import 'reflect-metadata';
import express from 'express';
import { PostgresConnector } from './database';
import { routes } from './routes';
require('dotenv-safe').config({
  allowEmptyValues:true
})

const app = express();
const connector: PostgresConnector = new PostgresConnector();

connector.connect().then(() => {
  console.log('[+] 🌀 PostgreSQL connected...')
}).catch(e => {
  console.log(`Error: ${e.message}`)
})

app.use(express.json());

app.use(routes)

export { app }