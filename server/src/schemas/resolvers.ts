import Story from "../models/Story.js";
import User from "../models/User.js";
import { signToken } from '../utils/auth.js'
import bcrypt from "bcryptjs"

interface GetUserStoriesArgs {
    userId: string
}

interface AddUserArgs {
    input: {
        username: string,
        email: string,
        password: string
    }
}

interface AddStoryArgs {
    title: string,
    story: string,
    imageUrl: string,
    userId: string
}

interface LoginArgs {
    input: {
        email: string;
        password: string
    }
}

const resolvers = {
    Query: {
        hello: async () => {
            return "Hello World";
        },

        getStories: async () => {
            return await Story.find().sort({ createdAt: -1 });
        },

        getUserStories: async (_: unknown, { userId }: GetUserStoriesArgs) => {
            return await Story.find({ userId }).sort({ createdAt: -1 });
        },

        getUsers: async () => {
            return await User.find().sort({ createdAt: -1 });
        },
    },

    Mutation: {
        addUser: async (_: unknown, { input }: AddUserArgs) => {
            const hashedPassword = await bcrypt.hash(input.password, 10)
            const newUser = await User.create({
                username: input.username,
                email: input.email,
                password: hashedPassword
            });
            const token = signToken(newUser.username, newUser._id);
            return { token, user: newUser };
        },
        addStory: async (_: unknown, { title, story, imageUrl, userId }: AddStoryArgs) => {
            const newStory = new Story({ title, story, imageUrl, userId });
            await newStory.save();
            return newStory;
        },
        login: async (_: unknown, { input }: LoginArgs) => {
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
}

export default resolvers