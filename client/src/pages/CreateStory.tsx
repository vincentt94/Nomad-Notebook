import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";

import { ADD_STORY } from "../utils/mutations.js";
import Auth from "../utils/auth.js"


interface CreateStoryProps {
    onAddStory: (title: string, story: string, image?: string) => void;
}

export default function CreateStory({ onAddStory }: CreateStoryProps) {
    const [title, setTitle] = useState("");
    const [story, setStory] = useState("");
    const [image, setImage] = useState<File | undefined | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [addStory, { loading, error }] = useMutation(ADD_STORY, {
        onCompleted: () => {
            alert("Story submitted successfully!");
            setTitle("");
            setStory("");
            setImage(null);
            setImagePreview(null);
        },
        onError: (err) => {
            console.error("Error adding story:", err);
            alert("Failed to submit story.");
        },
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file)
        const urlPreview = file ? URL.createObjectURL(file) : null;
        setImagePreview(urlPreview)
    }

    const handleRemoveImage = () => {
        setImage(null)
        setImagePreview(null)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const imageUrl = imagePreview || undefined;
        // create post and send to database
        addStory({
            variables: {
                title,
                story,
                image: imageUrl,
                // userId: "67d85ff2cb2a9e59fba5bf10" // hard coded to one example user in db
                // userId: Auth.getProfile().data.id, // Pass current user's ID
            },
        });
        onAddStory(title, story, imageUrl);
    }

    return (
        <div>
            <h1>Create Story</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Write your story here..."
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Choose a picture to upload:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple={false}
                    />
                </div>
                {imagePreview && (
                    <div>
                        <img src={imagePreview} alt="Preview"></img>
                        <div>
                            <button onClick={handleRemoveImage}>Remove Image</button>
                        </div>
                    </div>
                )}
                <input type="submit" value="Post Story"></input>
                { loading && (
                    <p>
                        Submitting story...
                    </p>
                )}
                { error && (
                    <p>
                        Issue submitting story.
                    </p>
                )}
            </form>
        </div>
    );
}