import * as dataSource from "../../dataSources/users";
import * as helper from "./helper";
import { v1 as uuid } from "uuid";


export const RegisterUser = async (args, context, name) => {
    const user = args.user
    if( await helper.validate_register_user(user) ){
        const _id = uuid();
        const data = {
            id: _id,
            email: user.email,
            username: user.username,
            password: helper.encrypt_password(user.password),
            status: 1,
            createdTimestamp: Date.now(),
            token: helper.get_token({id:_id, username: user.username, email: user.email})
        }
        const resp = await dataSource.create_user(data)
        return data
    }
};

export const LoginUser = async (args, context, name) => {
    const result = await dataSource.get_user_by_email(args.email);
    if(result.length === 0){
        return {}
    }else{
        const user = result[0]
        user.login_password = args.password
        if(await helper.validate_login_user(user)){
            user.token = await helper.get_token({id: user.id, email: user.email, username: user.username});
            await dataSource.update_token(user.id, user.token);
            return user
        }
    }
};