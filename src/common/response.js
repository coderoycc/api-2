// Estandarizar nuestras respuestas 
// Estructurar los datos al responder
import createError from 'http-errors'; //gestionamos errores

export const Response = {
  success: (res, status=200, message='OK', body={}) => {
    //correcto
    res.status(status).json({message, body})
  },
  error: (res, error=null) => {
    const { statusCode, message } = error ? error : new createError.InternalServerError()
    res.status(statusCode).json({message})  
  }
}