import React, { useState } from 'react';
import AreaDetail from '../components/areas/AreaDetail';
import AreaList from '../components/areas/AreaList';
import AreaForm from '../components/areas/AreaForm';
import AreaDelete from '../components/areas/AreaDelete';
import { createArea } from '../services/areaServices';

function AreasPage() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setIsDeleting(false);
  };

  const handleFormSubmit = async (area) => {
    try {
      await createArea(area.name);
      setSelectedArea(null);
    } catch (error) {
      console.error('Error creating area:', error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleAreaDeleted = () => {
    setSelectedArea(null);
    setIsDeleting(false);
  };

  return (
    <div>
      <h1>Area Administration</h1>
      <AreaForm onSubmit={handleFormSubmit} />
      <AreaList onSelect={handleAreaSelect} />
      {selectedArea && !isDeleting && (
        <div>
          <AreaDetail area={selectedArea} />
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
      {selectedArea && isDeleting && (
        <AreaDelete
          area={selectedArea}
          onDeleted={handleAreaDeleted}
        />
      )}
    </div>
  );
}

export default AreasPage;
