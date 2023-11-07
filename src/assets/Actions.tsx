import React from 'react';
import { IconButton } from '@material-ui/core';
import { DeleteIcon, EditIcon, ViewIcon } from './icons/Edit';

interface ActionProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Action: React.FC<ActionProps> = ({ onView, onEdit, onDelete }) => {
  return (
    <>
      <IconButton onClick={onView}>
        <ViewIcon />
      </IconButton>
      <IconButton onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default Action;
