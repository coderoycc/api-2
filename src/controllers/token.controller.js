import { pool } from "../db/db.js";

export const getTokenci = async (req, res) => {
  // Mostramos las fichas de un ciudadano con CI
  const { ci } = req.params;
  const [rows] = await pool.query(`SELECT * FROM token WHERE ci = ${ci};`);
  // console.log(req.headers.host)
  if (rows.length >= 1) {
    return res.send({
      msg: "Request Successful",
      rows,
    });
  }
  res.status(406).send({
    msg: `Token with CI ${ci} not found`,
  });
};

export const getTokens = async (req, res) => {
  // Mostrmos todas las fichas
  const [rows] = await pool.query(`SELECT * FROM token;`);
  // console.log(rows);
  res.status(200).send({
    msg: "REQUEST SUCCESSFUL",
    data: rows,
  });
};

export const createToken = async (req, res) => {
  // Recibimos { ci, id_q} nro obtenemos de una consulta a queue, status por defencto es E: Expectation
  const data = req.body;
  if (Object.keys(data).length == 2) {
    const [result] = await pool.query(
      "SELECT quantity FROM queue WHERE id_q = ? ;",
      [data.id_q]
    );
    console.log(result.length);
    if (result.length == 1) {
      let n = Number(result[0].quantity) + 1;
      const queryIn = await pool.query(
        `INSERT INTO token values(${data.ci},${data.id_q}, ${n},"E")`
      );
      return res.status(200).send({
        msg: "Token created",
        n_token: n,
        queue_id: data.id_q,
        ...queryIn[0]
      });
    } else {
      // NO existe la cola
      return res.status(406).send({
        error: "No valid queue was found to create the token",
        tip: "First create a new queue with a date",
      });
    }
  }
  res.status(406).send({
    msg: "An error occurred, the token was not created",
    ...data,
  });
};

export const updateTokenStatus = async (req, res) => {
  // Actualizamos status con "A" al registro con CI y ID_Q
  const { ci, id_q } = req.body;
  const [result] = await pool.query(
    'UPDATE token set status="A" WHERE ci = ? AND id_q = ?',
    [ci, id_q]
  );
  console.log(result);
  res.send({ 
    msg: `Token with CI ${ci} and ID_Q ${id_q} updated status`, 
    ...result
  });
};

export const deleteToken = async (req, res) => {
  // Recibimos { ci, id_q } 
  const { ci, id_q } = req.body;
  const [result] = await pool.query(`DELETE FROM token WHERE ci=${ci} AND id_q=${id_q};`);
  res.send({
    msg:`Token with CI ${ci} and ID_Q ${id_q} DELETED`,
    ...result
  })
};
