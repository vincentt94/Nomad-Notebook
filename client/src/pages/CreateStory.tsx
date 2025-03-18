import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_STORY } from "../utils/mutations.js";
import Auth from "../utils/auth";
import cityImg from "../assets/cityvibes.webp";
import forestImg from "../assets/forestvibes.avif";
import islandImg from "../assets/islandvibes.webp";
import lakeImg from "../assets/lakevibes.jpg";
import mountainImg from "../assets/mountainvibes.jpg";
import riverImg from "../assets/rivervibes.jpg";
import suburbanImg from "../assets/surburbanvibes.jpg";



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
        "../../assets/cityvibes.webp",
        "../../assets/forestvibes.avif",
        "../../assets/islandvibes.webp",
        "../../assets/lakevibes.jpg",
        "../../assets/mountainvibes.jpg",
        "../..assets/rivervibes.jpg",
        "../../assets/suburbanvibes.jpg",];

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
                imageUrl: imageUrl
            },
        });
        onAddStory();
    }
<<<<<<< HEAD

    

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
                    <label>Select an Image:</label>
                    <select value={selectedImage} onChange={(e) => setSelectedImage(e.target.value)} required>
                        <option value="">-- Choose an image --</option>
                        {imageOptions.map((image, index) => (
                            <option key={index} value={image}>
                                Image {index + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedImage && (
                    <div>
                        <img src={selectedImage} alt="Selected Preview" width="300px" />
                    </div>
                )}

                

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
=======
        return (
            <div className="create-story-container">
                <div className="create-story-box">
                    <h1>Create Story</h1>
                    <form onSubmit={handleSubmit}>
>>>>>>> 0710345e869d03230198f6f57602676946b3e7d5
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
<<<<<<< HEAD
                    </div>
                )}
                <input type="submit" value="Post Story"></input>
                {loading && (
                    <p>
                        Submitting story...
                    </p>
                )}
                {error && (
                    <p>
                        Issue submitting story.
                    </p>
                )}
            </form>
        </div>
    );
=======
                        <div>
                            <textarea
                                placeholder="Write Your Story Here..."
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
        
>>>>>>> 0710345e869d03230198f6f57602676946b3e7d5
}