const router = require("express").Router();
const usuariorouter= require("./user");
const apuestarouter= require("./apuesta");


router.use("/usuario",usuariorouter);
router.use("/apuesta",apuestarouter);

module.exports=router;

