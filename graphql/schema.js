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

    type RootMutation {
        createUser(userInput: UserInputData): User
    }

    type RootQuery {
        text: String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
