import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'

const EditPost = () => {

    const {id} = useParams();
    const [post, setPost] = useState([]);

    const updatePost = async (event) => {
        event.preventDefault();

        window.location = "/";

        const response = await fetch(`http://localhost:8000/post/${id}`, {
            method: "PUT",
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

    const deletePost = async (event) => {
        event.preventDefault();

        window.location = "/";
    
        const response = await fetch(`http://localhost:8000/post/${id}`, {
            method: "DELETE",
            mode: "cors",
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
    }

    useEffect(() => {
        async function fetchPost() {
            const response = await fetch(`http://localhost:8000/post/${id}`, {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            setPost(data);
        }

        fetchPost();
    }, [id]);

    return (
        <div>
            <form onSubmit={updatePost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" defaultValue={post.title} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" defaultValue={post.author} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" defaultValue={post.description} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost} >Delete</button>
            </form>
        </div>
    )
}

export default EditPost