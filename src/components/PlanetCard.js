import React, { useState, useEffect } from 'react';
import ResidentList from './ResidentList';

function PlanetCard({ planet }) {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    setLoading(true);
    setError(null);

    try {
      const residentPromises = planet.residents.map(url => fetch(url));
      const residentData = await Promise.all(residentPromises);
      const residents = await Promise.all(
        residentData.map(response => response.json())
      );
      setResidents(residents);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="planet-card">
      <h3>{planet.name}</h3>
      <ul>
        <li>Climate: {planet.climate}</li>
        <li>Population: {planet.population}</li>
        <li>Terrain: {planet.terrain}</li>
      </ul>
      {loading && <p>Loading residents...</p>}
      {error && <p>Error: {error.message}</p>}
      {residents.length > 0 && <ResidentList residents={residents} />}
    </div>
  );
}

export default PlanetCard;
