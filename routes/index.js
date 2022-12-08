const router = require("express").Router();
const usuariorouter= require("./user");
const apuestarouter= require("./apuesta");
const facturarouter= require("./factura");

router.use("/usuario",usuariorouter);
router.use("/apuesta",apuestarouter);
router.use("/factura",facturarouter);
module.exports=router;

