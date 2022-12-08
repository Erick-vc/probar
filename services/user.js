const AWS = require("aws-sdk");
const { response } = require("express");
const ServiceResponse = require("../entities/servicesResponse");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tabla = "villa_apuestas_database";


const userServices={

   get: async (email)=>{
    
    let serviceResponseGet= new ServiceResponse();
    
    const PK="VA-USUARIO#"+email;
    const SK=email;
    
    var params = {
        TableName: "villa_apuestas_database",
        Key:{
            "PK": PK,
            "SK": email
        }
    };

    try{
     const result= await dynamodb.get(params).promise();   

        serviceResponseGet.setSucessResponse("Usuario encontrado",result.Item)

    }catch(error){
    serviceResponseGet.setErrorResponse(response,500) 

    }finally{
        return serviceResponseGet;
    }

   }, 

   save: async (email, name,username,date_of_birth,dni,gender,password,phone )=>{
    
    let serviceResponseSave= new ServiceResponse();
    
    const PK="VA-USUARIO#"+email;
    const SK=email;
    const GSI1_PK=PK;
    const GSI1_SK=username;
    const credits=0;
  
    const user = {
      PK,
      SK,
      username,
      name,
      credits,
      date_of_birth,
      dni,
      gender,
      password,
      phone,
      GSI1_PK,
      GSI1_SK,
    };

    var params = {
        TableName: "villa_apuestas_database",
        Item: user,
      };

    try{
     await dynamodb.put(params).promise();   

        serviceResponseSave.setSucessResponse("Usuario registrado ",user)

    }catch(error){
    serviceResponseSave.setErrorResponse(error.message,500) 

    }finally{
        return serviceResponseSave;
    }

   },

   updateCredits: async (email,credits)=>{
    
    let serviceResponseupdateCredits= new ServiceResponse();
    
    const PK="VA-USUARIO#"+email;
    
    var params = {
        TableName: "villa_apuestas_database",
        Key:{
            "PK": PK,
            "SK": email
        },
        UpdateExpression: "SET credits = :credits", 
        ExpressionAttributeValues: {
          ":credits": credits
        },
        ReturnValues: 'ALL_NEW' 
    };

    try{
     const result= await dynamodb.update(params).promise();   

     serviceResponseupdateCredits.setSucessResponse("Creditos actualizados",result.Item)

    }catch(error){
        serviceResponseupdateCredits.setErrorResponse(response,500) 

    }finally{
        return serviceResponseupdateCredits;
    }

   },

   updatePassword: async (email,password)=>{
    
    let serviceResponseupdateCredits= new ServiceResponse();
    
    const PK="VA-USUARIO#"+email;
    
    var params = {
        TableName: "villa_apuestas_database",
        Key:{
            "PK": PK,
            "SK": email
        },
        UpdateExpression: "SET password = :password", 
        ExpressionAttributeValues: {
          ":password": password
        },
        ReturnValues: 'ALL_NEW' 
    };

    try{
     const result= await dynamodb.update(params).promise();   

     serviceResponseupdateCredits.setSucessResponse("Contraseña Actualizada",result.Item)

    }catch(error){
        serviceResponseupdateCredits.setErrorResponse(response,500) 

    }finally{
        return serviceResponseupdateCredits;
    }

   }





}


module.exports=userServices;