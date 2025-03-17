import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <button>
                <Link to="/createStory">
                    Temp Create Story
                </Link>
            </button>
        </div>
    );
}