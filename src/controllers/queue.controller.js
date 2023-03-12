import { pool } from "../db/db.js";
import { Response } from "../common/response.js";

export const getQueue = async (req, res) => {
  const { id } = req.params;
  const [row] = await pool.query(`SELECT * FROM queue WHERE id_q = ${id};`);
  if (row.length != 0) {
    return Response.success(res, '', row[0]);
  }
  res.status(400).send({ msg: `Not Found Queue with ID ${id}` });
};

export const getQueues = async (req, res) => {
  //Mostramos todas las colas
  const [rows] = await pool.query(`SELECT * FROM queue;`);
  res.status(200).send(rows);
};

export const createQueue = async (req, res) => {
  // body { date_q, id_serv }
  const data = req.body;
  if (Object.keys(data).length == 2) {
    const [rows] = await pool.query(
      "INSERT INTO queue(quantity, date_q, id_serv) values(?,?,?)",
      [0, data.date_q, data.id_serv]
    );
    return res.send({
      msg: "INSERT OK",
      ...rows,
    });
  }
  res.status(406).json({
    msg: "ERROR: Missing data { date_q, id_serv }",
  });
};

// El Update solo se realiza de la cantidad (quantity) esto se hace desde el trigger

export const deleteQueue = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(`DELETE FROM queue WHERE id_q = ${id};`);
  if (result[0].affectedRows == 1) {
    return res.send({
      msg: `Queue with ID ${id} has been deleted`,
      ...result[0],
    });
  }
  res.send({
    msg: `Queue with ID ${id} not deleted, because it does NOT EXIST`,
  });
};
