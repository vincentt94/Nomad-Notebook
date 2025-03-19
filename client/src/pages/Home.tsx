import { useQuery } from "@apollo/client";
import { GET_STORIES } from "../utils/queries";
import { Link } from "react-router-dom";
import JournalCard from "../components/JournalCard";


export default function Home() {
    const { data, loading, error } = useQuery(GET_STORIES);

    // Get all stories from query result
    const stories = data?.getStories || [];

    // Function to get 4 random stories (can change how much we want to display)
    const getRandomStories = (storiesArray: any[], count: number) => {
        const shuffled = [...storiesArray].sort(() => 0.5 - Math.random()); // Shuffle array
        return shuffled.slice(0, count); // Pick first 'count' elements
    };

    // Select up to 4 random stories (can change how much we want to display)
    const randomStories = getRandomStories(stories, 4);



    return (
        <div className="home-container">
            <h1>Recent Stories</h1>
    
            {loading && <p>Loading stories...</p>}
            {error && <p>Error loading stories.</p>}
    
            <div className="story-feed">
                {randomStories.map((story) => (
                    <JournalCard
                        key={story._id}
                        title={story.title}
                        story={story.story}
                        imageUrl={story.imageUrl}
                        username={story.username}
                    />
                ))}
            </div>
    
            <Link to="/mystories">
                <button className="create-story-button">Add Your Own Story</button>
            </Link>

        
        </div>
    );
    
}