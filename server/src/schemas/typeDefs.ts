const typeDefs = `

    type Story {
        id: ID!
        title: String!
        story: String!
        imageUrl: String
        userId: ID!
        createdAt: String
    }

    type User {
        _id: ID
        username: String
        password: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input UserInput {
        username: String!
        password: String!
    }

    type Query {
        hello: String
        getStories: [Story!]!
        getUserStories(userId: ID!): [Story!]!
        getUsers: [User]!
    }

    type Mutation {
        addUser(input: UserInput!): Auth
        addStory(title: String!, story: String!, imageUrl: String, userId: ID!): Story!
    }
`
export default typeDefs