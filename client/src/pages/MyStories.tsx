import { useState } from "react";
import CreateStory from "./CreateStory";
import JournalCard from "../components/JournalCard.tsx";

interface Story {
    title: string;
    story: string;
    image?: string;
}

export default function MyStories() {
    const [stories, setStories] = useState<Story[]>([]);

    const handleAddStory = (title: string, story: string, image?: string) => {
        setStories([...stories, { title, story, image }]);
    };

    return (
        <div>
            <CreateStory onAddStory={handleAddStory} />
            <div className="story-list">
                {stories.map((story, index) => (
                    <JournalCard key={index} {...story} />
                ))}
            </div>
        </div>
    );
}
