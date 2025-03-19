import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_STORY } from "../utils/mutations.js";


interface CreateStoryProps {
    onAddStory: () => void; // No parameters needed, just triggers refetch
}

export default function CreateStory({ onAddStory }: CreateStoryProps) {
    const [title, setTitle] = useState("");
    const [story, setStory] = useState("");
    const [image, setImage] = useState<File | undefined | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(""); //  Track selected predefined image


    const [addStory, { loading, error }] = useMutation(ADD_STORY, {
        onCompleted: () => {
            onAddStory();
            alert("Story submitted successfully!");
            setTitle("");
            setStory("");
            setImage(null);
            setImagePreview(null);
            setSelectedImage("");
        },
        onError: (err) => {
            console.error("Error adding story:", err);
            alert("Failed to submit story.");
        },
    });

    //stock images in an array
    const imageOptions = [
        { label: "City", value: "/assets/cityvibes.webp", },
        { label: "Forest", value: "/assets/forestvibes.avif" },
        { label: "Island", value: "/assets/Islandvibes.webp" },
        { label: "Lake", value: "/assets/lakevibes.jpg" },
        { label: "Mountain", value: "/assets/mountainvibes.jpg" },
        { label: "River", value: "/assets/rivervibes.jpg" },
        { label: "Suburbs", value: "/assets/surburbanvibes.jpg" },
    ];

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file)
        const urlPreview = file ? URL.createObjectURL(file) : null;
        setImagePreview(urlPreview);
        setSelectedImage(""); //clears selected stock image 

    }

    const handleRemoveImage = () => {
        setImage(null)
        setImagePreview(null)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const imageUrl = imagePreview || "";

        const finalImageUrl = imagePreview || selectedImage || ""; // use selected image or uploaded preview

        console.log("submitting story - Image URL:", finalImageUrl); // debuggging

        // create post and send to database
        addStory({
            variables: {
                title,
                story,
                imageUrl: finalImageUrl
            },
        });
        onAddStory();
    }
    return (
        <div className="create-story-container">
            <div className="create-story-box">
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
                            placeholder="Write Your Story Here..."
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            required
                        />
                    </div>
                    {/*Here we can select an image from a list*/}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}>

                        <label>Select an Image:</label>
                        <select value={selectedImage} onChange={(e) => setSelectedImage(e.target.value)}>
                            <option value="">-- Choose an image --</option>
                            {imageOptions.map((image, index) => (
                                <option key={index} value={image.value}>
                                    {image.label}
                                </option>
                            ))}
                        </select>
                        {/*This allows the user to preview the image*/}
                        {selectedImage && <img src={selectedImage} alt="Selected" width="300px" />}

                        {/*Here is where we can allow the user to upload an image of their choice*/}
                        <div>
                            <label>Choose a picture to upload:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                multiple={false}
                            />
                        </div>
                    </div>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                            <button onClick={handleRemoveImage}>Remove Image</button>
                        </div>
                    )}
                    <input type="submit" value="Post Story" />
                    {loading && <p>Submitting story...</p>}
                    {error && <p>Issue submitting story.</p>}
                </form>
            </div>
        </div>
    );

}