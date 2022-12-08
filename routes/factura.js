const router = require("express").Router();
const facturaController = require("../controllers/factura");

router.post("/registerFactura", async (req, res) => {
    const { email, ammount, mode, transfer_mode } = JSON.parse(req.body);
    const registerResponse = await facturaController.register(
        email,
        ammount,
        mode,
        transfer_mode
    );
    res.send(registerResponse);
});

router.post("/obtenerFacturaPorModo", async (req, res) => {
    const { email, mode } = JSON.parse(req.body);
    const registerResponse = await facturaController.getInvoiceByMode(
        email,
        mode
    );
    res.send(registerResponse);
});

router.post("/obtenerFacturaPorFecha", async (req, res) => {
    const { email, dateI, dateS } = JSON.parse(req.body);
    const viewResponse = await facturaController.getInvoiceByDate(
        email,
        dateI,
        dateS
    );
    res.send(viewResponse);
});

module.exports = router;
