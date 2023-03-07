import express from 'express'
import * as dotenv from 'dotenv'
import { pool } from './db/db.js'
dotenv.config()

const app = express()

/**
 * Probamos la conexión a la base de datos
 */
app.get('/ping', async (req, res) => {
  const [result] = await pool.query('SELECT "PONG" as result;')
  res.json(result)
})

app.listen(process.env.PORT)
console.log('Server on port', process.env.PORT)