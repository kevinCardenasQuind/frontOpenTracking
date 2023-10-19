import React from 'react';

function AreaDetail({ area, onEdit, onDelete }) {
  return (
    <div>
      <h2>Area Detail</h2>
      <p>Name: {area.name}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default AreaDetail;
