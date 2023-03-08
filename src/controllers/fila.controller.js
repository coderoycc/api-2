export const getFila = (req, res) => {
  // Mostramos una sola fila
  const { id } = req.params;
  res.send(`Recibido ${id}`);
};

export const getFilas = (req, res) => {
  //Mostramos todas las filas
};

export const createFila = (req, res) => {
  // Insertamos una nueva fila { fecha, objeto }
  const data = req.body;
  res.json({
    msg: "Recibido",
    ...data,
  });
};

export const deleteFila = (req, res) => {
  // Eliminamos una fila
  const { id } = req.params;
  res.send(`Recibido ${id}`);
};
