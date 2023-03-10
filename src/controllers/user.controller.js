import { pool } from "../db/db.js";

export const getUser = async (req, res) => {
  // Mostrar uno
  const { ci } = req.params;
  const [rows] = await pool.query(`SELECT * FROM user WHERE ci = ${ci}`);
  if (rows.length != 0) {
    return res.send(rows[0]);
  }
  res.status(400).send({ msg: `User with CI ${ci} not found` });
};

export const getUsers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM ");
  res.status(200).send(rows);
};

export const createUser = async (req, res) => {
  // recibimos en el body {ci, nombre comp, fecha_nac} DEBEN ESTAR TODOS LOS VALORES
  // Fecha del tipo YYYY-MM-DD
  const data = req.body;
  if (Object.keys(data).length == 3) {
    const [rows] = await pool.query("INSERT INTO user values(?,?,?)", [
      Number(data.ci),
      data.name,
      data.birth_date,
    ]);
    return res.send({
      msg: "INSERTED USER",
      ...rows,
    });
  }
  res.status(406).send("ERROR: Datos incompatibles");
};

export const updateUser = async (req, res) => {
  // Editar con ci por parametro
  const { ci } = req.params;
  const { body } = req;
  const uString = updateString(body);
  let query = `UPDATE user SET ${uString.join(',')} WHERE ci = ${ci}`;
  const result = await pool.query(query);
  if(result[0].affectedRows==1){
    return res.status(200).send({
      msg:`User with CI ${ci} has been updated`,
      ...result[0]
    })
  }
  res.status(406).send({
    msg:`User with CI ${ci} not updated`
  });
};

export const deleteUser = async (req, res) => {
  const { ci } = req.params;
  const result = await pool.query(`DELETE FROM user WHERE ci = ${ci};`);
  if(result[0].affectedRows == 1){
    return res.send({
      msg:`USER with CI ${ci} has been deleted`,
      ...result[0]
    })
  }
  res.send({
    msg:`USER with CI ${ci} not deleted`
  });
};

function updateString(obj){
  let arrString = []
  for(const x in obj){
    arrString.push(`${x}="${obj[x]}"`);
  }
  return arrString;
}