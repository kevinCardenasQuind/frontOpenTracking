import React from 'react';
import { deleteArea } from '../../services/areaServices';

function AreaDelete({ area, onDeleted }) {
  const handleDelete = async () => {
    try {
      const response = await deleteArea(area.id);
      if (response === true) {
        onDeleted(area);
        window.location.reload();
      }else{
        response.json().then((data) => {
          alert(data.message);
        });
      }
    } catch (error) {
      window.alert('Error deleting area: make sure there are no employees in the area');
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
