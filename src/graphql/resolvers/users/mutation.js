import dynamodb from "../../../db/dynamodb";
import jwt from 'jsonwebtoken';
import { v1 as uuid } from "uuid";
import bcrypt from 'bcryptjs';

export function insertUserToken(_id) {
    console.log('testse')
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: 300
    });
    return User.findByIdAndUpdate({ _id }, { token }, { new: true });
}

export const CreateUsers = async (args, context, name) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(args.password, salt);
        await insertUserToken(1);
        const params = {
            TableName: "dev-lagingapain-users",
            Items: {
                id: uuid(),
                email: args.email,
                password: passwordHash,
                createdTimestamp: Date.now(),
            }
        };
        await dynamodb.put(params)
        return {
            id: params.Items.id,
            email: params.Items.email
        }
    }
    catch(e){
        console.log('error',e,name)
    }
};
