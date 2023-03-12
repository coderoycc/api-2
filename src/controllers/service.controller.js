import { pool } from "../db/db.js";
import createError from "http-errors";
import { Response } from "../common/response.js";
export const getService = async (req, res) => {
  // Mostrar uno
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM service WHERE id_serv = ${id}`
    );
    if (rows.length != 0) {
      return Response.success(res, 200, "Result query Service ID", rows[0]);
    } else {
      throw new createError.NotFound(`Service with ID ${id} not found`);
    }
  } catch (error) {
    Response.error(res, error);
  }
};

export const getServices = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM service");
    Response.success(res, 200, "List Services", rows);
  } catch (error) {
    Response.error(res);
  }
};

export const createService = async (req, res) => {
  // recibimos en el body {descrip}
  const data = req.body;
  try {
    if (Object.keys(data).length == 1) {
      const [rows] = await pool.query(
        "INSERT INTO service(descrip) values(?)",
        [data.descrip]
      );
      return Response.success(res, 200, "Inserted Service", rows);
    } else {
      throw new createError.BadRequest(`Missing data: Service no inserted`);
    }
  } catch (error) {
    Response.error(res, error);
  }
};

export const updateService = async (req, res) => {
  // Editar con id por parametro (en body "descrip")
  const { id } = req.params;
  const { body } = req;
  try {
    if (body.descrip) {
      const query = `UPDATE service SET descrip="${body.descrip}" WHERE id_serv = ${id}`;
      const result = await pool.query(query);
      if (result[0].affectedRows == 1) {
        return Response.success(res, 200, `Service with ID ${id} has been updated`, result[0])
      }else{
        throw new createError.NotFound(`No Updated service with ID ${id} Not found`);
      }
    } else {
      throw new createError.BadRequest("ERROR: Send *descrip* in the request BODY");
    }
  } catch (error) {
    Response.error(res, error);
  }
};

/**
 * No se puede eliminar, por posible violación de integridad referencial
 */
export const deleteService = (req, res) => {
  Response.error(res, new createError.Conflict("It is not possible to delete records due to referential integrity issues."));
};
