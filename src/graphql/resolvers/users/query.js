import {getUserByEmail, getAuth} from "./helper";


export const GetUserByEmail = async (args, context, name) => {
    const user = await getAuth(auth);
    if (user) {
        const resp = await getUserByEmail(args.email)
        return resp
    }
};
