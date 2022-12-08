const AWS = require("aws-sdk");
const { response } = require("express");
const ServiceResponse = require("../entities/servicesResponse");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tabla = "villa_apuestas_database";

const facturaServices = {
    getByMode: async (email, mode) => {
        let serviceResponseGet = new ServiceResponse();

        const GSI2_PK = "VA-FACTURA#" + email;
        const GSI2_SK = mode;

        var params = {
            TableName: "villa_apuestas_database",
            IndexName: "GSI2",
            KeyConditionExpression: "GSI2_PK = :GSI2_PK and GSI2_SK = :GSI2_SK",
            ExpressionAttributeValues: {
                ":GSI2_PK": GSI2_PK,
                ":GSI2_SK": GSI2_SK,
            },
        };

        try {
            const result = await dynamodb.query(params).promise();
            serviceResponseGet.setSucessResponse(
                "Factura encontrada",
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

    //TODO: Filtrar por fecha
    /* getByDate: async (email, date1) => {
        let serviceResponseGet = new ServiceResponse();

        const PK = "VA-FACTURA#" + email;

        var params = {
            TableName: "villa_apuestas_database",
            Key: {
                PK: PK,
                SK: mode,
            },
        };

        try {
            const result = await dynamodb.get(params).promise();

            serviceResponseGet.setSucessResponse(
                "Facturas encontrada",
                result.Items
            );
        } catch (error) {
            serviceResponseGet.setErrorResponse(response, 500);
        } finally {
            return serviceResponseGet;
        }
    }, */

    save: async (email, ammount, mode, transfer_mode) => {
        let serviceResponseSave = new ServiceResponse();
        const date = new Date();
        const PK = "VA-FACTURA#" + email;
        //TODO: hasheado -> fecha, hora, email
        const SK = "123456";
        const GSI1_PK = PK;
        //TODO: Date en String
        const GSI1_SK = date.toISOString();
        const GSI2_PK = PK;
        const GSI2_SK = "recarga";

        const factura = {
            PK,
            SK,
            ammount,
            date,
            GSI1_PK,
            GSI1_SK,
            GSI2_PK,
            GSI2_SK,
            mode,
            transfer_mode,
        };

        var params = {
            TableName: "villa_apuestas_database",
            Item: factura,
        };

        try {
            await dynamodb.put(params).promise();

            serviceResponseSave.setSucessResponse(
                "Factura registrada",
                factura
            );
        } catch (error) {
            serviceResponseSave.setErrorResponse(error.message, 500);
        } finally {
            return serviceResponseSave;
        }
    },
};

module.exports = facturaServices;
