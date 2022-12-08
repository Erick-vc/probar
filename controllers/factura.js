const ServiceResponse = require("../entities/servicesResponse");
const facturaService = require("../services/factura");

const facturaController = {
    register: async (email, ammount, mode, transfer_mode) => {
        const responseSave = await facturaService.save(
            email,
            ammount,
            mode,
            transfer_mode
        );
        return responseSave;
    },

    getInvoiceByMode: async (email, mode) => {
        const responseGet = await facturaService.getByMode(email, mode);
        return responseGet;
    },
};
module.exports = facturaController;
