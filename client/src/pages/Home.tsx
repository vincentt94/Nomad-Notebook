import { useQuery } from "@apollo/client";
import { GET_STORIES } from "../utils/queries";
import { Link } from "react-router-dom";
import JournalCard from "../components/JournalCard"

export default function Home() {
    const { data, loading, error } = useQuery(GET_STORIES);

    // If stories exist, randomly pick one
    const stories = data?.getStories || [];
    const randomStory = stories.length > 0 ? stories[Math.floor(Math.random() * stories.length)] : null;

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to Nomad Notebook!</p>

            {loading && <p>Loading stories...</p>}
            {error && <p>Error loading stories.</p>}

            {randomStory && (
                <JournalCard
                    title={randomStory.title}
                    story={randomStory.story}
                    image={randomStory.imageUrl} 
                    username={randomStory.username}
                />
            )}

            <Link to="/mystories">
                <button>Create Your Own Story</button>
            </Link>
        </div>
    );
}