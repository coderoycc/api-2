import { pool } from "../db/db.js";

export const getFicha = (req, res) => {
  // Mostramos las fichas de un ciudadano con CI
  const { ci } = req.params;
  res.send(`Se recibió el CI ${ci}`);
};

export const getFichas = (req, res) => {
  // Mostramos las fichas de una sola fecha (recibimos de FORM)
  console.log(req.query);
  res.status(200).send(`Recibido`);
};

export const createFicha = async (req, res) => {
  const data = req.body;
  // Insertamos una nueva ficha (recibimos {ci, servicio/objeto, fecha})
  // Buscamos el servicio de la fecha si es que existe (si no lo creamos)
  if (Object.keys(data).length == 3) {
    const [result] = await pool.query(
      `SELECT * FROM dia_fila WHERE fecha like "${
        data.fecha
      }" AND objeto like "${data.objeto.toUpperCase()}"`
    );
    // Cabecera del id_ficha
    const id_header = data.fecha.substr(5).split("-").reverse().join("");
    console.log(result.length)
    console.log(result,"------")
    if (result.length != 0) {
      //existe la fila
      const [verify] = await pool.query(
        `SELECT id_ficha FROM ficha WHERE id_dia=${result[0].id_dia} AND id_ficha like "${id_header}%" ORDER BY id_ficha DESC LIMIT 1`
      );

      let n_fila = Number(verify[0].id_ficha.substr(5)) + 1;
      n_fila = n_fila <= 9 ? "00" + n_fila : "0" + n_fila;
      const insert = await pool.query(
        `INSERT INTO ficha(id_ficha, ci, id_dia, estado) values("${id_header}-${n_fila}", ${data.ci}, ${result[0].id_dia}, "E")`
      );
      return res.send({
        msg: "Insercion Correcta",
        nroFicha: id_header +"-" +n_fila,
        ...insert,
      });
    } else {
      // No existe la fila (creamos una)
      const [rows] = await pool.query(
        "INSERT INTO dia_fila(fecha, objeto) values(?,?)",
        [data.fecha, data.objeto.toUpperCase()]
      );
      // (ID, CI, ID_DIA, estado) <E, A>
      const insert = await pool.query(
        `INSERT INTO ficha(id_ficha, ci, id_dia, estado) values("${id_header}-001", ${data.ci}, ${rows.insertId}, "E")`
      );
      return res.send({
        msg: "Insert Nueva Fila y nueva ficha",
        nroFicha: id_header + "-001",
        ...insert,
      });
    }
  }
  res.status(406).send({
    msg: "ERROR datos, no se insertó ningún dato",
    ...data,
  });
};

export const updateFicha = (req, res) => {
  // Editamos la ficha recibimos (en el body {estado})
  const { estado } = req.body;
  res.send(`Recibido ${estado}`);
};

export const deleteFicha = (req, res) => {
  // Eliminamos una ficha (recibimos id_ficha)
  const { id } = req.params;
  res.send(`Recibido ${id}`);
};
