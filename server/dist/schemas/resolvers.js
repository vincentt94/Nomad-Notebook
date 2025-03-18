import Story from "../models/Story.js";
import User from "../models/User.js";
import { signToken } from '../utils/auth.js';
import bcrypt from "bcryptjs";
const resolvers = {
    Query: {
        hello: async () => {
            return "Hello World";
        },
        getStories: async () => {
            return await Story.find().sort({ createdAt: -1 });
        },
        getUserStories: async (_, __, context) => {
            return await Story.find({ userId: context.user._id }).sort({ createdAt: -1 });
        },
        getUsers: async () => {
            return await User.find().sort({ createdAt: -1 });
        },
    },
    Mutation: {
        addUser: async (_, { input }) => {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const newUser = await User.create({
                username: input.username,
                email: input.email,
                password: hashedPassword
            });
            const token = signToken(newUser.username, newUser._id);
            return { token, user: newUser };
        },
        addStory: async (_, { title, story, imageUrl }, context) => {
            const newStory = new Story({ title, story, imageUrl, userId: context.user._id });
            await newStory.save();
            return newStory;
        },
        login: async (_, { input }) => {
            const user = await User.findOne({ email: input.email });
            if (!user) {
                throw new Error("No user found with this email address.");
            }
            const validPassword = await bcrypt.compare(input.password, user.password);
            if (!validPassword) {
                throw new Error("Incorrect password.");
            }
            const token = signToken(user.username, user._id);
            return { token, user };
        }
    }
};
export default resolvers;
