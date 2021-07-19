import {getAuth} from "../users/helper";

export default {
    Query: {
        hello: async (root,args,context) => {
            await getAuth(context);
            return "Your GraphQL API is now LIVE!🎈 ";
        }
    },
}