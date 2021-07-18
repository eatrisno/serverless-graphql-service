import dynamodb from "../../../db/dynamodb";
import jwt from 'jsonwebtoken';
import { v1 as uuid } from "uuid";
import bcrypt from 'bcryptjs';

export const insertUserToken = async (_id) => {
    try{
        console.log(_id,'-----------')
        const userToken = jwt.sign({ _id }, process.env.JWT_SECRET, {
            expiresIn: 300
        });
        const params = {
            TableName: "dev-lagingapain-users",
            Key: {
                id: _id.toString()
            },
            UpdateExpression: "set userToken = :t",
            ExpressionAttributeValues:{
                ":t":userToken
            },
            ReturnValues:"UPDATED_NEW"
        };
        await dynamodb.update(params);
    }catch(e){
        console.log('error',e)
    }
}

export const CreateUser = async (args, context, name) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(args.password, salt);
        const params = {
            TableName: "dev-lagingapain-users",
            Item: {
                id: uuid(),
                email: args.email,
                password: passwordHash,
                createdTimestamp: Date.now(),
            }
        };
        const resp = await dynamodb.put(params)
        const userToken = await insertUserToken(params.Item.id);

        return {
            id: params.Item.id,
            email: params.Item.email,
            userToken: userToken
        }
    }
    catch(e){
        console.log('error',name,e)
    }
};
