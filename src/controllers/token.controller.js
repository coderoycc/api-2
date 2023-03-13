import { pool } from "../db/db.js";
import { Response } from "../common/response.js";
import createError from "http-errors";

export const getTokenci = async (req, res) => {
  // Mostramos las fichas de un ciudadano con CI
  const { ci } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM token WHERE ci = ${ci};`);
    // console.log(req.headers.host)
    if (rows.length >= 1) {
      return Response.success(res, 200, "Request Successful", rows);
    } else {
      throw createError.BadRequest(`Token with CI ${ci} not found`);
    }
  } catch (error) {
    Response.error(res, error);
  }
};

export const getTokens = async (req, res) => {
  // Mostrmos todas las fichas
  try {
    const [rows] = await pool.query(`SELECT * FROM token;`);
    Response.success(res, 200, "Request Successfull", rows);
  } catch (error) {
    Response.error(res);
  }
};

export const createToken = async (req, res) => {
  // Recibimos { ci, id_q} nro obtenemos de una consulta a queue, status por defencto es E: Expectation
  const data = req.body;
  try {
    if (Object.keys(data).length == 2) {
      const [result] = await pool.query(
        "SELECT quantity FROM queue WHERE id_q = ? ;",
        [data.id_q]
      );
      if (result.length == 1) {
        const [result_u] = await pool.query('SELECT * FROM user WHERE ci = ?', [data.ci]);
        if(result_u.length == 1){
          let n = Number(result[0].quantity) + 1;
          const queryIn = await pool.query(
            `INSERT INTO token values(${data.ci},${data.id_q}, ${n},"E")`
          );
          return Response.success(res, 201, "Token Created", {
            n_token: n,
            queue_id: data.id_q,
            ...queryIn[0],
          });
        }else{
          throw new createError.BadRequest(`User with CI ${data.ci} does not exist`);
        }
      } else {
        // NO existe la cola
        throw new createError.BadRequest(
          `No valid queue was found to create the token. **First create a new queue with a date**`
        );
      }
    } else {
      throw new createError.BadRequest('Missing data, **ci** and **id_q** are needed in the request body');
    }
  } catch (error) {
    if(!!error.code){
      Response.error(res)
    }else{
      Response.error(res, error);
    }
  }
};

export const updateTokenStatus = async (req, res) => {
  // Actualizamos status con "A" al registro con CI y ID_Q
  try {
    const { ci, id_q } = req.body;
    const [result] = await pool.query(
      'UPDATE token set status="A" WHERE ci = ? AND id_q = ?',
      [ci, id_q]
    );
    return Response.success(res, 200, `Token with CI ${ci} and ID_Q ${id_q} updated status`, {...result})
  } catch (error) {
    Response.error(res);
  }
};

export const deleteToken = async (req, res) => {
  // Recibimos { ci, id_q }
  try {
    const { ci, id_q } = req.body;
    const [result] = await pool.query(
      `DELETE FROM token WHERE ci=${ci} AND id_q=${id_q};`
    );
    Response.success(res, 200, `Token with CI ${ci} and ID_Q ${id_q} DELETED`, ...result)
  } catch (error) {
    Response.error(res);
  }
};
