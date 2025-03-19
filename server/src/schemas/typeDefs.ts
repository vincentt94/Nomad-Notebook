const typeDefs = `
    scalar Upload
    
    type Story {
        _id: ID!
        title: String!
        story: String!
        imageUrl: String
        userId: ID!
        username: String
        createdAt: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        hello: String
        getStories: [Story!]!
        getUserStories: [Story!]!
        getUsers: [User]!
    }

    type Mutation {
        addUser(input: UserInput!): Auth
        login(input: LoginInput!): Auth
        addStory(title: String!, story: String!, imageUrl: String): Story!
        uploadImage(file: Upload!): String!
    }
`
export default typeDefs