import dynamodb from "../../../db/dynamodb";

export const GetUserByEmail = async (args, context, name) => {
    try{
        const params = {
            TableName: "dev-lagingapain-users",
            ConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": args.email,
            },
        };
        const result = await dynamodb.scan(params);
        if(result.Items.length === 0){
            return "No data";
        }
        else{
            const i = result.Items[0];
            return {
                id: i.id,
                email: i.email,
                token: i.token
            }
        }
    }
    catch(e){
        console.log('error',name,e)
    }
};
