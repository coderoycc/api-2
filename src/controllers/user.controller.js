import { pool } from "../db/db.js";

export const getUser = (req, res) => {
  // Mostrar uno
  const { ci } = req.params;
  console.log(ci);
  res.send("Recibido");
};

export const getUsers = (req, res) => {
  // Mostrar todos
};

export const createUser = async (req, res) => {
  // recibimos en el body {ci, nombre, apellido, fecha_nac, est_civil} DEBEN ESTAR TODOS LOS VALORES
  // Fecha del tipo YYYY-MM-DD
  const data = req.body;
  if(Object.keys(data).length == 5){
    const [rows] = await pool.query('INSERT INTO ciudadano values(?,?,?,?,?)', [Number(data.ci),data.nombre, data.apellido, data.fecha_nac, data.est_civil])
    return res.send({
      msg:"INSERTADO OK",
      ...rows
    });
  }
  res.status(406).send('ERROR: Datos incompatibles')
};

export const updateUser = (req, res) => {
  // Editar con ci por parametro
  const { ci } = req.params;
  res.send(`Se actualizó al usuario con CI ${ci}`);
};

export const deleteUser = (req, res) => {
  const { ci } = req.params;
  res.send(`Se eliminó al usuario con CI ${ci}`);
};
