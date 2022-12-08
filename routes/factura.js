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

router.post("/obtenerFactura", async (req, res) => {
    const { email, mode } = JSON.parse(req.body);
    const registerResponse = await facturaController.getInvoiceByMode(
        email,
        mode
    );
    res.send(registerResponse);
});

module.exports = router;
