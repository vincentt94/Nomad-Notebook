import Story from "../models/Story.js";
import User from "../models/User.js";
import { signToken } from '../utils/auth.js';
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
const resolvers = {
    Query: {
        hello: async () => {
            return "Hello World";
        },
        getStories: async () => {
            const stories = await Story.find().sort({ createdAt: -1 }).lean();
            // return await Story.find().sort({ createdAt: -1 });
            // Populate the username by looking up the userId in the User model
            const populatedStories = await Promise.all(stories.map(async (story) => {
                const user = await User.findById(story.userId);
                return {
                    ...story,
                    username: user ? user.username : "Unknown", // If user is not found, return "Unknown"
                };
            }));
            return populatedStories;
        },
        getUserStories: async (_, __, context) => {
            return await Story.find({ userId: context.user._id }).sort({ createdAt: -1 });
        },
        getUsers: async () => {
            return await User.find().sort({ createdAt: -1 });
        },
    },
    Upload: GraphQLUpload,
    Mutation: {
        uploadImage: async (_, { file }) => {
            // Ensure file is correctly received
            if (!file) {
                throw new Error("No file received.");
            }
            const { createReadStream } = await file;
            const stream = createReadStream();
            const uploadResult = await new Promise((resolve, reject) => {
                const cloudStream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
                    if (error)
                        reject(error);
                    resolve(result);
                });
                stream.pipe(cloudStream);
            });
            return uploadResult.secure_url; // Return Cloudinary image URL
        },
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
            console.log("saving story - Image URL:", imageUrl); // debugging 
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
