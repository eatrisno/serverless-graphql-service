export default `
type User {
    id: String
    email: String
    token: String
}

type Query {
    GetUserByEmail(email: String!): User!
}

type Mutation {
    CreateUser(email: String!, password: String!): User!
}
`;