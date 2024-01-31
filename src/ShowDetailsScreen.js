import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ShowDetailsScreen() {
  const [show, setShow] = useState(null);
  const { id } = useParams(); // Access route parameters

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShow();
  }, [id]); 

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{show.name}</h2>
      {show.image && (
        <img
          src={show.image.medium}
          alt={show.name}
          style={{ marginBottom: '20px', maxWidth: '50%', height: '100%', width: '250px' }} // Adjusted CSS for the image
        />)}
      <p>Type: {show.type}</p>
      <p>Genres: {show.genres.join(', ')}</p>
      <p>Status: {show.status}</p>
      <p>Average Rating: {show.rating?.average}</p>
      <p>Summary: {show.summary}</p>
    </div>
  );
}

export default ShowDetailsScreen;
