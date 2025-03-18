import { useState } from "react";
import { useQuery } from "@apollo/client";
import CreateStory from "./CreateStory";
import JournalCard from "../components/JournalCard.tsx";
import { USER_STORIES } from "../utils/queries.js";

interface Story {
    id: string;
    title: string;
    story: string;
    image?: string;
}

export default function MyStories() {
    // const [stories, setStories] = useState<Story[]>([]);

    const { loading, error, data, refetch } = useQuery(USER_STORIES);

    // Ensure data exists before accessing getUserStories
    const stories = data?.getUserStories ?? [];

    /*
    const handleAddStory = (id: string, title: string, story: string, image?: string) => {
        setStories([...stories, { id, title, story, image }]);
    };
    */

    return (
        <div>
            <CreateStory onAddStory={refetch} />
            <div className="story-list">
                {stories.length > 0 ? (
                    stories.map((story: Story, index: number) => <JournalCard key={index} {...story} />)
                ) : (
                    <p>No stories found.</p>
                )}
            </div>
        </div>
    );
}
