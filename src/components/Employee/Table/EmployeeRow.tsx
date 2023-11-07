import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import Action from '../../../assets/Actions';
import './EmployeeRow.css'
import DeleteEmployeeModal from '../DeleteEmployeeModal';
import ViewEmployeeModal from '../ViewEmployeeModal';
import UpdapteEmployeeModal from '../updapteEmployeeModal';

interface EmployeeRowProps {
  employee: {
    name: string;
    document: string;
    team_id: string;
    created_at: string;
    updated_at: string;
  };
  teamName: string;
  onEmployeeDeleted: () => void;
  onEmployeeUpdated: () => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, teamName, onEmployeeDeleted, onEmployeeUpdated }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleView = () => {
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };
  
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  return (
    <TableRow>
      <TableCell className="slimTableCell">{employee.name}</TableCell>
      <TableCell className="slimTableCell">{employee.document}</TableCell>
      <TableCell className="slimTableCell">{employee.created_at}</TableCell>
      <TableCell className="slimTableCell">{teamName}</TableCell>
      <TableCell className="slimTableCell">
        <Action 
          onView={handleView} 
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
        <DeleteEmployeeModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          document={employee.document}
          onEmployeeDeleted={onEmployeeDeleted}
        />
        <ViewEmployeeModal
          open={viewModalOpen}
          onClose={closeViewModal}
          employee={employee}
          teamName={teamName}
        />
        <UpdapteEmployeeModal
          open={editModalOpen}
          onClose={closeEditModal}
          employee={employee}
          onEmployeeUpdated={onEmployeeUpdated}
        />
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;
