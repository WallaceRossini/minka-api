import { Connection, ConnectionOptions, createConnection } from "typeorm";


export class PostgresConnector {

  private static postgres_connection: Connection;

  private host: string
  private port: number
  private username: string
  private password: string
  private database: string
  private entities: string

  constructor() {
    this.host = String(process.env.DATABASE_HOST)
    this.port = Number(process.env.DATABASE_PORT)
    this.username = String(process.env.DATABASE_USER)
    this.password = String(process.env.DATABASE_PASS)
    this.database = String(process.env.DATABASE_NAME)
    this.entities = `${__dirname}/../${process.env.DATABASE_ENTITIES}`
  }


  get connection(): Connection {
    return PostgresConnector.postgres_connection;
  }

  public async connect() {

    const opts: ConnectionOptions = {
      type: 'postgres',
      host: this.host,
      port: this.port,
      ssl: {
        rejectUnauthorized: false,
      },
      username: this.username,
      password: this.password,
      database: this.database,
      entities: [
        this.entities
      ]
    }

    const connection = await createConnection(opts);

    PostgresConnector.postgres_connection = connection

  }


  public async disconnect(): Promise<any> {
    return PostgresConnector.postgres_connection.close();
  }


}