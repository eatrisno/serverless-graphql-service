export default `
type User {
    id: String
    email: String
    username: String
    token: String
}

input RegisterUserInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
}

type Query {
    GetUserByEmail(email: String!): User!
}

type Mutation {
    RegisterUser(user: RegisterUserInput!): User!
    LoginUser(email: String!, password: String!): User!
}
`;