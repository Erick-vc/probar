const router = require("express").Router();
const apuestaController = require("../controllers/apuesta");

router.post("/registerApuesta", async (req, res) => {
  const {email, mode, cuota, local, monto, visitor, ligue}= JSON.parse(req.body) ;
  const registerResponse = await apuestaController.register(email, mode, cuota, local, monto, visitor, ligue);
  res.send(registerResponse)
});


router.post("/filtrarApuesta", async (req, res) => {
  const {email, date}= JSON.parse(req.body) ;
  const viewResponse = await apuestaController.view(email, date);
  res.send(viewResponse)
});


router.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports=router;