import React, { useState } from 'react';
import { createArea, updateArea } from '../../services/areaServices';

function AreaForm({ area, onSaved }) {
  const [name, setName] = useState(area ? area.name : '');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { name };
    try {
      if (area) {
        await updateArea(area.id, payload);
      } else {
        await createArea(payload);
      }
      onSaved();
    } catch (error) {
      console.error('Error saving area:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Area Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <button type="submit">{area ? 'Update' : 'Create'}</button>
    </form>
  );
}

export default AreaForm;
