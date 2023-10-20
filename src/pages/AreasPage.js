import React, { useState } from "react";
import AreaDetail from "../components/areas/AreaDetail";
import AreaList from "../components/areas/AreaList";
import AreaForm from "../components/areas/AreaForm";
import AreaDelete from "../components/areas/AreaDelete";
import { createArea, updateArea } from "../services/areaServices";

function AreasPage() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setIsDeleting(false);
    setIsEditing(false);
  };

  const handleFormSubmit = async (area) => {
    try {
      if (isEditing) {
        await updateArea(selectedArea.id, area.name);
      } else {
        await createArea(area.name);
      }
      setSelectedArea(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving area:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAreaDeleted = () => {
    setSelectedArea(null);
    setIsDeleting(false);
  };

  return (
    <div>
      <h1>Area Administration</h1>
      <AreaForm
        area={isEditing ? selectedArea : null}
        onSaved={handleFormSubmit}
      />
      <AreaList onSelect={handleAreaSelect} />
      {selectedArea && !isDeleting && !isEditing && (
        <div>
          <AreaDetail
            area={selectedArea}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
      )}
      {selectedArea && isDeleting && (
        <AreaDelete area={selectedArea} onDeleted={handleAreaDeleted} />
      )}
    </div>
  );
}

export default AreasPage;
