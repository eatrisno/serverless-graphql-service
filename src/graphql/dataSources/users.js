import * as dynamodb from "../../db/dynamo";

export const get_user_by_email = (email) => {

    const params = {
        TableName: "dev-lagingapain-users",
        FilterExpression: "email = :email",
        ExpressionAttributeValues: {
            ":email": email,
        },
    };
    return dynamodb.scan(params);
}

export function create_user(data){
    const params = {
        TableName: "dev-lagingapain-users",
        Item: data
    };
    return dynamodb.createItem(params)
}
export function update_token(id,token){
    const params = {
        TableName: "dev-lagingapain-users",
        Key:{
            "id": user.id,
        },
        UpdateExpression: "set #token = :t",
        ExpressionAttributeNames: {
            "#token": "token"
        },
        ExpressionAttributeValues:{
            ":t":user.token
        },
        ReturnValues:"UPDATED_NEW"
    }
    return dynamodb.updateItem(params)
}