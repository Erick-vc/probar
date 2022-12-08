const ServiceResponse = require("../entities/servicesResponse");
const apuestaService = require("../services/apuesta");
const bcryptjs = require("bcryptjs");

const apuestaController = {
  register: async (email, mode, local, cuota, monto, visitor, ligue) => {
    const responseSave = await apuestaService.save(
      email,
      mode,
      local,
      cuota,
      monto,
      visitor,
      ligue
    );
    return responseSave;
  },

  view: async (email, dateI, dateS) => {

    if (dateI === null) {
      dateI = dateS;
    } else if (dateS === null) {
      dateS = dateI;
    }

    //** */  Aumentar el date superior en uno

    const aux = dateS.substring(0, 8);
    const aux2 = dateS.substring(8, 10);
    const dia = parseInt(aux2) + 1;
    var diaString = String(dia);

    if (diaString.length == 1) {
      diaString = "0" + diaString;
    }

    const DATE1 = dateI;
    const DATE2 = aux + diaString;
    
    const responseGet = await apuestaService.get(email, DATE1, DATE2);

    // if (!responseGet.data) {
    //   responseGet.setErrorResponse("No se encontraron apuestas", 400);
    //   return responseGet;

    return responseGet;
  },
};

module.exports = apuestaController;
