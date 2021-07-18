import {UserInputError, AuthenticationError} from 'apollo-server-lambda';
import dynamodb from "../../../db/dynamodb";
import jwt from 'jsonwebtoken';
import { v1 as uuid } from "uuid";
import bcrypt from 'bcryptjs';

export const getAuth = async (auth) => {
    if (!auth) throw new AuthenticationError('you must be logged in!');
  
    const token = auth.split('Bearer ')[1];
    if (!token) throw new AuthenticationError('you should provide a token!');
  
    const user = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw new AuthenticationError('invalid token!');
      return decoded;
    });
    console.log(user);
    return user;
};

async function validate_register_user(data){
    if(data.password === "" || data.confirmPassword === "" || data.id === ""|| data.username === "" || data.email === "") return false
    if(data.password !== data.password) return false
    if(!await getUserByEmail(data.email)) return false
    return true
}

async function validate_login_user(data){
    if(data.password === "" || data.email === "") return false
    if(!await bcrypt.compare(data.curr_password, data.password)) return false
    return true
}

const get_token = ({ id, username, email }) =>
    jwt.sign(
    {
        id,
        username,
        email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
    );

export const loginUser = async (email, password) => {
    try{
        const params = {
            TableName: "dev-lagingapain-users",
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
        };
        const result = await dynamodb.scan(params);
        if(result.Items.length === 0){
            return {};
        }
        else{
            const user = result.Items[0];
            user.curr_password = password;
            if(await validate_login_user(user)){
                return {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    token: user.token
                }
            }else{
                return {}
            }
        }
    }
    catch(e){
        console.log('error',e)
        return {}
    }
};
export const getUserByEmail = async (email) => {
    try{
        const params = {
            TableName: "dev-lagingapain-users",
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
        };
        const result = await dynamodb.scan(params);
        if(result.Items.length === 0){
            return {};
        }
        else{
            const i = result.Items[0];
            return {
                id: i.id,
                email: i.email,
                username: i.username,
                password: i.password,
                token: i.userToken
            }
        }
    }
    catch(e){
        console.log('error',e)
        return {}
    }
};

export const registerUser = async (args, context, name) => {
    try{
        const user = args.user
        if(await validate_register_user(user)){
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(user.password, salt);
            const _id = uuid();
            const params = {
                TableName: "dev-lagingapain-users",
                Item: {
                    id: _id,
                    email: user.email,
                    username: user.username,
                    password: passwordHash,
                    status: 1,
                    createdTimestamp: Date.now(),
                    token: get_token({id:_id, username: user.username, email: user.email})
                }
            };
            const resp = await dynamodb.put(params)
            const i = params.Item
            return {
                id: i.id,
                email: i.email,
                username: i.username,
                token: i.token
            }
        }else{
            return {}
        }
    }
    catch(e){
        console.log('error',name,e)
    }
}