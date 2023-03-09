import { pool } from "../db/db.js";

export const getFila = (req, res) => {
  // Mostramos una sola fila
  const { id } = req.params;
  res.send(`Recibido ${id}`);
};

export const getFilas = (req, res) => {
  //Mostramos todas las filas
};

export const createFila = async (req, res) => {
  // Insertamos una nueva fila { fecha, objeto }
  const data = req.body;
  if (Object.keys(data).length == 2) {
    const [rows] = await pool.query(
      "INSERT INTO dia_fila(fecha, objeto) values(?,?)",
      [data.fecha, data.objeto.toUpperCase()]
    );
    return res.send({
      msg: "INSERT OK",
      ...rows
    });
  }
  res.status(406).json({
    msg: "ERROR: DATOS NECESARIOS faltantes"
  });
};

export const deleteFila = (req, res) => {
  // Eliminamos una fila
  const { id } = req.params;
  res.send(`Recibido ${id}`);
};
