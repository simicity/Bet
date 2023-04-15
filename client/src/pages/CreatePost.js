import React from 'react';
import './CreatePost.css'

const CreatePost = () => {
    const createPost = async (event) => {
        event.preventDefault();

        // Set redirect
        window.location = "/";

        const response = await fetch("http://localhost:8000/post", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": event.target.title.value,
                "author": event.target.author.value,
                "description": event.target.description.value,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description">
                </textarea>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost