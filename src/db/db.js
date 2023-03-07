/**
 * Conexión de la base de datos
 */
import { createPool } from 'mysql2/promise'
import * as dotenv from 'dotenv'
dotenv.config()

export const pool = createPool({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWD,
  port: 3306,
  database:process.env.DB
})
