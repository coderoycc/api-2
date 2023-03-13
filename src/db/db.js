/**
 * Conexión de la base de datos
 */
import { createPool } from 'mysql2/promise'
import {
  DB,
  DB_HOST,
  DB_PASS,
  DB_USER,
  DB_PORT
} from '../config.js';
export const pool = createPool({
  host: DB_HOST,
  user:DB_USER,
  password:DB_PASS,
  database:DB,
  port:DB_PORT
})
