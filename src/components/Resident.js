import React from 'react';

function Resident({ resident }) {
  return (
    <li key={resident.name}>
      {resident.name} (Height: {resident.height}, Mass: {resident.mass}, Gender: {resident.gender})
    </li>
  );
}

export default Resident;