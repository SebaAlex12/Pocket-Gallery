const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Album {
        _id: ID!
        userId: String!
        name: String!
        title: String!
        access: String
        description: String
        status: String!
        photos: [String]
        createdAt: String!
    }

    input AlbumInputData {
        userId: String!
        name: String!
        title: String!
        access: String
        description: String
        status: String!
        createdAt: String!
    }

    type RootMutation {
        addAlbum(albumInput: AlbumInputData): Album!
        removeAlbum(albumId: String!): Album!
    }

    type RootQuery {
        fetchAlbums(userId: String!, status: String!, access: String!): [Album]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
