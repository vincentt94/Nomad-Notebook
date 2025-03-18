import React from "react";

interface JournalCardProps {
    title: string;
    story: string;
    image?: string;
    username: string;
}

export default function JournalCard({ title, story, image, username }: JournalCardProps) {
    return (
        <div className="journal-card">
            {image && <img src={image} alt={title} className="journal-image" />}
            <div className="journal-content">
                <h2 className="journal-title">{title}</h2>
                <p className = "journal-author"> By: {username}</p>
                <p className="journal-text">{story}</p>
            </div>
        </div>
    );
}
