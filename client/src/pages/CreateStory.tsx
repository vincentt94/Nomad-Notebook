import { useState, ChangeEvent, FormEvent } from "react";


interface CreateStoryProps {
    onAddStory: (title: string, story: string, image?: string) => void;
}

export default function CreateStory({ onAddStory }: CreateStoryProps) {
    const [title, setTitle] = useState("");
    const [story, setStory] = useState("");
    const [image, setImage] = useState<File | undefined | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        onAddStory(title, story, imageUrl);
        // create post and send to database
        // reset form
        
        setTitle("");
        setStory("");
        setImage(null);
        setImagePreview(null);
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
            </form>
        </div>
    );
}