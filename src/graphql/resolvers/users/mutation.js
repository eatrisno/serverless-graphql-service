import users from "../../types/users";
import {registerUser, loginUser} from "./helper";

export const RegisterUser = async (args, context, name) => {
    const user = await registerUser(args, context, name);
    return user
};

export const LoginUser = async (args, context, name) => {
    const user = await loginUser(args.email, args.password);
    console.log(user)
    return user
};