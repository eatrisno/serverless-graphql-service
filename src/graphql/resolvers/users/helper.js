import * as dataSources from "../../dataSources/users";
import {UserInputError, AuthenticationError, ValidationError} from 'apollo-server-lambda';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export async function validate_login_user(data){
    if(data.password === "" || data.email === "") throw new UserInputError("username / password salah.")
    if(!await bcrypt.compare(data.login_password, data.password)) throw new ValidationError("username / password salah.")
    return true
}

export async function getAuth(req){
    const auth = req.headers.authorization || '';
    if (!auth) throw new AuthenticationError('you must be logged in!');
    const token = auth.split('Bearer ')[1];
    if (!token) throw new AuthenticationError('you should provide a token!');
    const user = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw new AuthenticationError('invalid token!');
      return decoded;
    });
    return user;
};

export async function validate_register_user(data){
    if(data.password === "" || data.confirmPassword === "" || data.username === "" || data.email === "") throw new UserInputError("data registrasi salah.")
    if(data.password !== data.confirmPassword) throw new UserInputError("password dan confirm password tidak sesuai")
    const user = await dataSources.get_user_by_email(data.email);
    if(user.length !== 0) throw new ValidationError("account sudah teregistrasi")
    return true
}


export function get_token(data){
    return jwt.sign(
        data,
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}

export function encrypt_password(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}