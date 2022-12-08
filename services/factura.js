const bcryptjs = require("bcryptjs");
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

    getByDate: async (email, DATE1, DATE2) => {
        let serviceResponseGet = new ServiceResponse();

        const GSI1_PK = "VA-FACTURA#" + email;

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
                "Facturas encontradas",
                result.Items
            );
        } catch (error) {
            serviceResponseGet.setErrorResponse(response, 500);
        } finally {
            return serviceResponseGet;
        }
    },

    save: async (email, ammount, mode, transfer_mode) => {
        let serviceResponseSave = new ServiceResponse();
        const today = new Date();
        var date = today.toISOString();
        const PK = "VA-FACTURA#" + email;
        const hashid = await bcryptjs.hash(email + date, 8);
        const SK = hashid;
        const GSI1_PK = PK;
        const GSI1_SK = date;
        const GSI2_PK = PK;
        const GSI2_SK = mode;

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
