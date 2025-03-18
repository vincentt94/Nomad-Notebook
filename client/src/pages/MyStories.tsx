import { useState } from "react";
import CreateStory from "./CreateStory";
import JournalCard from "../components/JournalCard.tsx";
import Auth from "../utils/auth";

interface Story {
    title: string;
    story: string;
    image?: string;
    username: string;
}

export default function MyStories() {
    const [stories, setStories] = useState<Story[]>([]);

    const handleAddStory = (title: string, story: string, image?: string) => {
        const username = Auth.getProfile().data.username;
        setStories([...stories, { title, story, image, username }]);
    };

    return (
        <div>
            <CreateStory onAddStory={handleAddStory} />
            <div className="story-list">
                {stories.map((story, index) => (
                    <JournalCard key={index} {...story} username={story.username} />
                ))}
            </div>
        </div>
    );
}
