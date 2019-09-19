const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
}

input UserInputData {
    name: String!
    email: String!
    password: String!
    createdAt: String!
}

type UserLoginData {
    _id: ID!
    name: String!
    email: String!
    createdAt: String!
    password: String!
    token: String!
}

type RootMutation {
    createUser(userInput: UserInputData): User!
}

type RootQuery {
    loginUser(email: String!, password: String!): UserLoginData!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
