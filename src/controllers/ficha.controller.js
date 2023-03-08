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

export const createFicha = (req, res) => {
  // Insertamos una nueva ficha (recibimos {ci, servicio, fecha})
  // Buscamos el servicio de la fecha si es que existe (si no lo creamos)
  const data = req.body;
  res.send({
    msg: "Recibido",
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
