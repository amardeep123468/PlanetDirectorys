import React, { useState, useEffect } from 'react';
import PlanetCard from './components/PlanetCard';
import './styles/App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://swapi.dev/api/planets/?page=${currentPage}`);
      const data = await response.json();
      setPlanets(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="app">
      <h1> Planets Directory</h1>
      {loading && <p>Loading planets...</p>}
      {error && <p>Error: {error.message}</p>}
      {planets.length > 0 && (
        <>
          <div className="planets-container">
            {planets.map(planet => (
              <PlanetCard key={planet.name} planet={planet} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevClick} disabled={currentPage === 1}>
              Previous
            </button>
            <p>Page {currentPage}</p>
            <button onClick={handleNextClick}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
