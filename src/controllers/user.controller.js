import { pool } from "../db/db.js";
import { Response } from '../common/response.js';
import createError from 'http-errors';
export const getUser = async (req, res) => {
  // Mostrar uno
  try {
    const { ci } = req.params;
    const [rows] = await pool.query(`SELECT * FROM user WHERE ci = ${ci}`);
    if (rows.length != 0) {
      return Response.success(res, 200, 'Request Successful', rows[0]);
    }else{
      throw new createError.BadRequest(`User with CI ${ci} not found`);
    }
  } catch (error) { // SI no existe error.code (Problema con la consulta INTERNO)
    return !!error.code ? Response.error(res) : Response.error(res, error)
  }
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user;");
    Response.success(res, 200, 'Request successful',rows);
  } catch (error) {
    Response.error(res)
  }
};

export const createUser = async (req, res) => {
  // recibimos en el body {ci, nombre comp, fecha_nac} DEBEN ESTAR TODOS LOS VALORES
  // Fecha del tipo YYYY-MM-DD
  try {
    const data = req.body;
    if (Object.keys(data).length == 3) {
      const [rows] = await pool.query("INSERT INTO user values(?,?,?)", [
        Number(data.ci),
        data.name,
        data.birth_date,
      ]);
      return Response.success(res, 201, 'Inserted User', rows)
    }else{
      throw new createError.BadRequest(`Needed CI, NAME, BIRTH_DATE in the request body`);
    }
  } catch (error) {
    return !!error.code ? Response.error(res) : Response.error(res, error)
  }
};

export const updateUser = async (req, res) => {
  // Editar con ci por parametro
  try {
    const { ci } = req.params;
    const { body } = req;
    const uString = updateString(body);
    let query = `UPDATE user SET ${uString.join(',')} WHERE ci = ${ci}`;
    const result = await pool.query(query);
    if(result[0].affectedRows==1){
      return Response.success(res, 200, `User with CI ${ci} has been updated`, {...result[0]})
    }else{
      throw new createError.BadRequest(`User with CI ${ci} not updated`)
    }
  } catch (error) {
    return !!error.code ? Response.error(res) : Response.error(res, error)    
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { ci } = req.params;
    const result = await pool.query(`DELETE FROM user WHERE ci = ${ci};`);
    if(result[0].affectedRows == 1){
      return Response.success(res, 200, `USER with CI ${ci} has been deleted`, {...result[0]});
    }else{
      throw new createError.BadRequest(`USER with CI ${ci} not deleted.`)
    }
  } catch (error) {
    return !!error.code ? Response.error(res) : Response.error(res, error)    
  }
};

/**
 * Crea una cadena para la consulta
 */
function updateString(obj){
  let arrString = []
  for(const x in obj){
    arrString.push(`${x}="${obj[x]}"`);
  }
  return arrString;
}


/**
 * Para hacer una actualización parcial se puede usar PATCH 
 * La consulta sería de la siguiente manera
 * pool.query('UPDATE user SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id]); 
 */