const ServiceResponse = require("../entities/servicesResponse");
const userService = require("../services/user");
const bcryptjs = require("bcryptjs");
const userController = {

register: async (email, name,username,date_of_birth,dni,gender,password,phone)=>{
    const responseGet = await userService.get(email);

    if(responseGet.data){
        responseGet.setErrorResponse("El email seleccionado ya existe",400);
        return responseGet;
    }

        //Encriptar contraseña 

    const hashPassword= await bcryptjs.hash(password,8);


    const  responseSave = await userService.save(email, name,username,date_of_birth,dni,gender,hashPassword,phone);
        return responseSave;


},


view: async (email)=>{
    const responseGet = await userService.get(email);

    if(!responseGet.data){
        responseGet.setErrorResponse("El usuario no existe",400);
        return responseGet;
    }

       return responseGet;     
},


login: async (email,password)=>{
    const responseLogin = await userService.get(email);

    //verificar si el usuario existe
    if(!responseLogin.data){
        responseLogin.setErrorResponse("El usuario no existe",400);
        return responseLogin;
    }

    const validPassword = await bcryptjs.compare( password,responseLogin.data.password);

    if (!validPassword) {
        responseLogin.setErrorResponse("Contraseña no válida", 401);
        return responseLogin;
      }

       //jwt
       const token = await bcryptjs.hash(email,8);
       responseLogin.setSucessResponse("Se inició sesión exitosamente", {
        token: token,
      });
  
      return responseLogin;  
}




}

module.exports=userController;