
const router = require("express").Router();
const userController = require("../controllers/user");
/**
------------------------- 
Login (jwt/determinar)

ver perfil (pasarlo por url tal vez)
 **/ 

router.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Hello desde usuario Principal!",
    });
  });

  router.post("/register", async (req, res) => {
      const {email, name,username,date_of_birth,dni,gender,password,phone}= JSON.parse(req.body) ;
      const registerResponse = await userController.register(email, name,username,date_of_birth,dni,gender,password,phone);
      res.send(registerResponse)
    });

    router.post("/view", async (req, res) => {
      const {email}= JSON.parse(req.body) ;
      const viewResponse = await userController.view(email);
      res.send(viewResponse)
    });

    router.post("/login", async (req, res) => {
      const { email, password } = JSON.parse(req.body) ;
      const loginResponse = await userController.login(email, password);
      res.send(loginResponse);
    }); 






  router.use((req, res, next) => {
    return res.status(404).json({
      error: "Not Found",
    });
  });
  
  module.exports=router;
  