export default {
    Query: {
        hello: async (root,args,context) => {
            console.log(context)
            return "Your GraphQL API is now LIVE!🎈 ";
        }
    },
}