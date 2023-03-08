export const getCiudadano = (req, res) => {
  // Mostrar uno
  const { ci } = req.params;
  console.log(ci);
  res.send("Recibido");
}

export const getCiudadanos = (req, res) => {
  // Mostrar todos
}

export const createCiuadano = (req, res) => {
  // recibimos en el body {ci, nombre, apellido, fecha_nac, est_civil}
  const data = req.body;
  console.log(data.ci);
  console.log(data.nombre);

  res.send("Recibido");
}

export const updateCiudadano = (req, res) => {
  // Editar con ci por parametro
  const { ci } = req.params;
  res.send(`Se actualizó al usuario con CI ${ci}`);
}

export const deleteCiudadano = (req, res) => {
  const { ci } = req.params;
  res.send(`Se eliminó al usuario con CI ${ci}`);
}