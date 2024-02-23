import React from 'react';
import Resident from './Resident';

function ResidentList({ residents }) {
  return (
    <ul className="residents-list">
      {residents.map(resident => (
        <Resident key={resident.name} resident={resident} />
      ))}
    </ul>
  );
}

export default ResidentList;
