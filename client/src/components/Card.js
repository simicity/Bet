import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const id = props.id;
  const [count, setCount] = useState(props.betCount);

  const updateCount = async (event) => {
    event.preventDefault();;

    setCount((count) => count + 1);
    
    const response = await fetch(`http://localhost:8000/post/${id}/count`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "betCount": count + 1,
        }),
      });
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"by " + props.author}</h3>
          <p className="description">{props.description}</p>
          <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button>
      </div>
  );
};

export default Card;