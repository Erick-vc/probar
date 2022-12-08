const bcryptjs = require("bcryptjs");
const AWS = require("aws-sdk");
const { response } = require("express");
const ServiceResponse = require("../entities/servicesResponse");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tabla = "villa_apuestas_database";

const apuestaService = {
    save: async (email, mode, couta, local, monto, visitor, ligue) => {
        let serviceResponseSave = new ServiceResponse();
        const today = new Date();
        var date = today.toISOString();

        const PK = "VA-APUESTA#" + email;

        const hashid = await bcryptjs.hash(email + date, 8);

        const SK = hashid;
        const GSI1_PK = PK;
        const GSI1_SK = date;

        const apuesta = {
            PK,
            SK,
            email,
            mode,
            couta,
            local,
            monto,
            visitor,
            ligue,
            GSI1_PK,
            GSI1_SK,
        };

        var params = {
            TableName: "villa_apuestas_database",
            Item: apuesta,
        };

        try {
            await dynamodb.put(params).promise();

            serviceResponseSave.setSucessResponse(
                "Apuesta registrada ",
                apuesta
            );
        } catch (error) {
            serviceResponseSave.setErrorResponse(error.message, 500);
        } finally {
            return serviceResponseSave;
        }
    },

    get: async (email, DATE1, DATE2) => {
        let serviceResponseGet = new ServiceResponse();

        const GSI1_PK = "VA-APUESTA#" + email;

        var params = {
            TableName: "villa_apuestas_database",
            IndexName: "GSI1",
            KeyConditionExpression:
                "GSI1_PK = :GSI1_PK and GSI1_SK BETWEEN :DATE1 AND :DATE2",
            ExpressionAttributeValues: {
                ":GSI1_PK": GSI1_PK,
                ":DATE1": DATE1,
                ":DATE2": DATE2,
            },
        };

        try {
            const result = await dynamodb.query(params).promise();
            serviceResponseGet.setSucessResponse(
                "Apuesta encontrado",
                result.Items
            );
        } catch (error) {
            serviceResponseGet.setErrorResponse(error.message, 500);
        } finally {
            // console.log(GSI1_PK);
            // console.log(GSI1_SK);
            console.log(params);
            return serviceResponseGet;
        }
    },
};

module.exports = apuestaService;
