import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import Story from "../models/Story.js";
dotenv.config();
//connects to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travel-journal");
//sample users
const users = [
    {
        username: "student123",
        email: "student123@email.com",
        password: bcrypt.hashSync("password123", 10),
    },
    {
        username: "Dayman",
        email: "Charlie@email.com",
        password: bcrypt.hashSync("password123", 10),
    },
    {
        username: "Nightman",
        email: "Dennis@email.com",
        password: bcrypt.hashSync("password123", 10),
    },
];
//sample stories
const stories = [
    {
        title: "Exploring the Amazon Rainforest",
        story: "I hiked through the jungle and encountered exotic wildlife. It was breathtaking!",
        // image: "need to figure out if I want this here or not",
    },
    {
        title: "Climbing in Colorado",
        story: "When I was visiting Colorado, I was able to rock climb and explore the various mountains.  It was wonderful and a great time.",
        // image: "need to figure out if I want this here or not",
    },
    {
        title: "Krazy Kyoto",
        story: "Last night in Kyoto was a blur!  I don't remember a thing",
        // image: "need to figure out if I want this here or not",
    },
];
const seedDatabase = async () => {
    try {
        //  Clean Database (Delete existing records)
        await User.deleteMany({});
        await Story.deleteMany({});
        //  Insert Users
        const createdUsers = await User.insertMany(users);
        console.log(" Users Seeded!", createdUsers);
        //  Assign Random Users to Stories
        const storiesWithUsers = stories.map((story) => {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            return {
                ...story,
                userId: randomUser._id, //  Store user ID
                username: randomUser.username, //  Store username
            };
        });
        //  Insert Stories
        const insertedStories = await Story.insertMany(storiesWithUsers);
        console.log(" Stories Seeded!", insertedStories);
        //  Exit Seed Process
        process.exit();
    }
    catch (err) {
        console.error("seeding failed", err);
        process.exit(1);
    }
};
seedDatabase();
