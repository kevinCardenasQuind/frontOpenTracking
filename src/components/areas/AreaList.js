import React, { useEffect, useState } from "react";
import { getAreas } from "../../services/areaServices";
import {
  Button,
  Provider,
  defaultTheme,
  Heading,
} from "@adobe/react-spectrum";

function AreaList({ onSelect }) {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const data = await getAreas();
        setAreas(data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    }

    fetchAreas();
  }, []);

  return (
    <Provider theme={defaultTheme}>
      <div>
        <Heading level={2}>Area List</Heading>
        <ul>
          {areas.map((area) => (
            <li key={area.id}>
              {area.name}
              <Button variant="cta" onPress={() => onSelect(area)}>
                View
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Provider>
  );
}

export default AreaList;
