import {get_user_by_email} from "../../dataSources/users";
import {getAuth} from "./helper";


export const GetUserByEmail = async (args, context, name) => {
    const user = await getAuth(auth);
    const result = await get_user_by_email(args.email)
    if(result.length === 0){
        return {};
    }
    else{
        const user = result[0];
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            token: user.userToken
        }
    }
};
