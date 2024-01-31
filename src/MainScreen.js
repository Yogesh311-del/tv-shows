import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainScreen() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://api.tvmaze.com/search/shows?q=all'),
        ]);

        const data = await Promise.all(responses.map(response => response.json()));

        setShows(data.flat());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const listItemStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'cornflowerblue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'grey', width: '100%', textAlign: 'center' }}>
        <h1>All Shows</h1>
      </div>
      <ul style={{ padding: 0, width: '100%' }}>
        {shows.map(({ show }) => (
          <li key={show.id} style={{ ...listItemStyle, maxWidth: '300px', margin: '0 auto' }}>
            <Link to={`/show/${show.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ textAlign: 'center' }}>
                {show.image && <img src={show.image.medium} alt={show.name} style={{ width: '100%', borderRadius: '8px' }} />}
                <h2>{show.name}</h2>
                <p>Type: {show.type}</p>
                <p>Genres: {show.genres.join(', ')}</p>
                <p>Status: {show.status}</p>
                <p>Average Rating: {show.rating?.average}</p>
              </div>
            </Link>
            <Link to={`/show/${show.id}`}>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              >
                Show Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainScreen;
