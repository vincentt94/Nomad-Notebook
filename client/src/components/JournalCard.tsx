
import "../utils/journalcard.css"

interface JournalCardProps {
    id?: string;
    title: string;
    story: string;
    imageUrl?: string;
    username?: string;
}

export default function JournalCard({ title, story, imageUrl, username }: JournalCardProps) {
    console.log("Rendered JournalCard:", {title, imageUrl, username}); // debugging issue 
    return (
        <div className="journal-card">
            {imageUrl && <img src={imageUrl} alt={title} className="journal-image" />}
            <div className="journal-content">
                <h2 className="journal-title">{title}</h2>
                {username && 
                    <p className = "journal-author"> By: {username}</p>
                }
                <p className="journal-text">{story}</p>
            </div>
        </div>
    );
}
