import React from 'react';
import { deleteArea } from '../../services/areaServices';

function AreaDelete({ area, onDeleted }) {
  const handleDelete = async () => {
    try {
      await deleteArea(area.id);
      onDeleted();
    } catch (error) {
      console.error('Error deleting area:', error);
    }
  };

  return (
    <div>
      <h2>Delete Area</h2>
      <p>Are you sure you want to delete {area.name}?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default AreaDelete;
