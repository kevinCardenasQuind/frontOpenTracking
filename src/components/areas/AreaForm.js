import React, { useState, useEffect } from "react";
import { createArea, updateArea } from "../../services/areaServices";
import AreaList from "./AreaList";
import {
  Button,
  TextField,
  Form,
  Provider,
  defaultTheme,
} from "@adobe/react-spectrum";

function AreaForm({ area, onSaved }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (area) {
      setName(area.name);
    }
  }, [area]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const areaData = name;
    try {
      if (area) {
        await updateArea(area.id, areaData);
      } else {
        await createArea(areaData);
      }
      onSaved();
    } catch (error) {
      console.error("Error saving area:", error);
    }
    window.location.reload(AreaList);
  };

  return (
    <Provider theme={defaultTheme}>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Area Name"
          type="text"
          value={name}
          onInput={(e) => setName(e.target.value)}
          isRequired
        />
        <Button type="submit" variant="cta">
          Save
        </Button>
      </Form>
    </Provider>
  );
}

export default AreaForm;
