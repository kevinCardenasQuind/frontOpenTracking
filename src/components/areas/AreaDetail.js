import React from 'react';
import moment from 'moment';

function AreaDetail({ area, onEdit, onDelete }) {
  return (
    <div>
      <h2>Area Detail</h2>
      <p>Name: {area.name}</p>
      <p>Created At: {moment(area.created_at).format('LL')}</p>
      <p>Updated At: {moment(area.updated_at).format('LL')}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default AreaDetail;
