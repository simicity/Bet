import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const ReadPosts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch("http://localhost:8000/posts", {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            setPosts(data.rows);
        }

        fetchPosts();
    }, []);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post, index) => 
                   <Card key={post.rowid} id={post.rowid.toString()} title={post.title} author={post.author} description={post.description} betCount={post.betCount} />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    );
}

export default ReadPosts;