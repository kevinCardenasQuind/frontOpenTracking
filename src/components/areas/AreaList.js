import React, { useEffect, useState } from 'react';
import { getAreas } from '../../services/areaServices';

function AreaList({ onSelect }) {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const data = await getAreas();
        setAreas(data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    }

    fetchAreas();
  }, []);

  return (
    <div>
      <h2>Area List</h2>
      <ul>
        {areas.map(area => (
          <li key={area.id}>
            {area.name}
            <button onClick={() => onSelect(area)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AreaList;
