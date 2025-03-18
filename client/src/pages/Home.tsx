import { useQuery } from "@apollo/client";
import { GET_STORIES } from "../utils/queries"; // Import GraphQL query
import { Link } from "react-router-dom";

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
                <div>
                    <h2>{randomStory.title}</h2>
                    <p><strong>By:</strong> {randomStory.username}</p>
                    <p>{randomStory.story}</p>
                    {randomStory.image && <img src={randomStory.image} alt={randomStory.title} width="300" />}
                </div>
            )}

            <Link to="/createStory">
                <button>Create Your Own Story</button>
            </Link>
        </div>
    );
}
