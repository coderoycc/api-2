import { pool } from "../db/db.js";

export const getService = async (req, res) => {
  // Mostrar uno
  const { id } = req.params;
  const [rows] = await pool.query(`SELECT * FROM service WHERE id_serv = ${id}`);
  if (rows.length != 0) {
    return res.send(rows[0]);
  }
  res.status(400).send({ msg: `Service with ID ${id} not found` });
};

export const getServices = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM service");
  res.status(200).send(rows);
};

export const createService = async (req, res) => {
  // recibimos en el body {descrip} 
  const data = req.body;
  if (Object.keys(data).length == 1) {
    const [rows] = await pool.query("INSERT INTO service(descrip) values(?)", [data.descrip]);
    return res.send({
      msg: "INSERTED Service",
      ...rows,
    });
  }
  res.status(406).send({msg:"ERROR: No Inserted"});
};

export const updateService = async (req, res) => {
  // Editar con id por parametro (en body "descrip")
  const { id } = req.params;
  const { body } = req;
  if(body.descrip){
    const query = `UPDATE service SET descrip="${body.descrip}" WHERE id_serv = ${id}`;
    const result = await pool.query(query);
    if(result[0].affectedRows==1){
      return res.status(200).send({
        msg:`Service with ID ${id} has been updated`,
        ...result[0]
      })
    }
  }else{
    return res.send({
      msg:'ERROR: Send *descrip* in the request BODY'
    })
  }
  res.status(406).send({
    msg:`Service with ID ${ci} not updated, because it does NOT EXIST`
  });
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(`DELETE FROM service WHERE id_serv = ${id};`);
  if(result[0].affectedRows == 1){
    return res.send({
      msg:`Service with ID ${id} has been deleted`,
      ...result[0]
    })
  }
  res.send({
    msg:`Service with ID ${id} not deleted, because it does NOT EXIST`
  });
};
