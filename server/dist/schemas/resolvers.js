import Story from "../models/Story.js";
import User from "../models/User.js";
import { signToken } from '../utils/auth.js';
const resolvers = {
    Query: {
        hello: async () => {
            return "Hello World";
        },
        getStories: async () => {
            return await Story.find().sort({ createdAt: -1 });
        },
        getUserStories: async (_, { userId }) => {
            return await Story.find({ userId }).sort({ createdAt: -1 });
        },
        getUsers: async () => {
            return await User.find().sort({ createdAt: -1 });
        },
    },
    Mutation: {
        addUser: async (_, { input }) => {
            const newUser = await User.create({ ...input });
            const token = signToken(newUser.username, newUser._id);
            return { token, user: newUser };
        },
        addStory: async (_, { title, story, imageUrl, userId }) => {
            const newStory = new Story({ title, story, imageUrl, userId });
            await newStory.save();
            return newStory;
        },
    }
};
export default resolvers;
