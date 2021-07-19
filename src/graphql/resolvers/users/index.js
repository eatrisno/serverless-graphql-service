import {getAuth} from "./helper";
import {GetUserByEmail} from "./query";
import {RegisterUser, LoginUser} from "./mutation";

export default {
    Query: {
        GetUserByEmail: async (root, args, context) => {
            getAuth(context);
            GetUserByEmail(args, context, 'QueryGetUserByEmail');
        }
    },
    Mutation: {
        RegisterUser: async (root,args,context) => RegisterUser(args, context, 'MutationCreateUser'),
        LoginUser: async (root, args, context) => LoginUser( args, context, "MutationLoginUser")
    }
}