const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        createdAt: String!        
    }

    type Photo {
        _id: ID!
        title: String!
        description: String!
        imageUrl: String!
        status: String!
        createdAt: String!
    }

    input UserInputData {
        name: String!
        email: String!
        password: String!
        createdAt: String!
    }

    input PhotoInputData {
        title: String!
        description: String!
        imageUrl: String!
        status: String!
        createdAt: String
    }

    type UserLoginData {
        _id: ID!
        name: String!
        email: String!
        createdAt: String!
        token: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        addPhoto(photoInput: PhotoInputData): Photo!
    }

    type RootQuery {
        loginUser(email: String!, password: String!): UserLoginData!
        fetchPhotos(album: String, category: String, status: String!): [Photo]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
