import { pool } from "../db/db.js";
import { Response } from "../common/response.js";
import createError from 'http-errors';

export const getQueue = async (req, res) => {
  const { id } = req.params;
  const [row] = await pool.query(`SELECT * FROM queue WHERE id_q = ${id};`);
  if (row.length != 0) {
    return Response.success(res, 200, `Queue with ID ${id}`, row[0]);
  }
  Response.error(res, new createError.NotFound(`Queue with ID ${id} not found`));
};

// metodo que nos permite obtener los valores de una Cola, devuelve todos los registros
export const getQueues = async (req, res) => {
  //Mostramos todas las colas
  try{
    const [rows] = await pool.query(`SELECT * FROM queue;`);
    Response.success(res, 200, 'List of all queues', rows);
  }catch(error){
    Response.error(res);
  }
};

export const createQueue = async (req, res) => {
  // body { date_q, id_serv }
  const data = req.body;
  try {
    if (Object.keys(data).length == 2) {
      const [rows] = await pool.query(
        "INSERT INTO queue(quantity, date_q, id_serv) values(?,?,?)",
        [0, data.date_q, data.id_serv]
      );
      return Response.success(res, 200, 'INSERTED Queue', rows);
    }else{
      throw new createError.BadRequest('Missing data: {data_q, id_serv}');
    }
  } catch (error) {
    Response.error(res, error);
  }
};

// El Update solo se realiza de la cantidad (quantity) esto se hace desde el trigger

export const deleteQueue = async (req, res) => {
  const { id } = req.params;
  try{
    const result = await pool.query(`DELETE FROM queue WHERE id_q = ${id};`);
    if (result[0].affectedRows == 1) {
      return Response.success(res, 200, `Queue with ID ${id} has been deleted`, result[0])
    }else{
      throw new createError.BadRequest(`Queue with ID ${id} not deleted, because it does NOT EXIST`);
    }
  }catch(error){
    Response.error(res, error);
  }
};
