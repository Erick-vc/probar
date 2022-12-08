const ServiceResponse = require("../entities/servicesResponse");
const apuestaService = require("../services/apuesta");
const bcryptjs = require("bcryptjs");

const apuestaController = {
  register: async (
    email,
    mode, 
    local, 
    cuota,
    monto, 
    visitor, 
    ligue
  ) => {
    const responseSave = await apuestaService.save(email, mode, local, cuota, monto, visitor, ligue);
    return responseSave;
  }, 


  view: async (email, date) => {
    const responseGet = await apuestaService.get(email, date);

    // if (!responseGet.data) {
    //   responseGet.setErrorResponse("No se encontraron apuestas", 400);
    //   return responseGet;

    return responseGet;
  }
}

module.exports = apuestaController;
