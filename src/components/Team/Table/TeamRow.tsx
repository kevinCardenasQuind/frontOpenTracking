import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import ViewTeamModal from '../ViewTeamModal';
import DeleteTeamModal from '../DeleteTeamModal';
import { Team } from '../../../Models/Team';
import UpdateTeamModal from '../UpdateTeamModal';
import Action from '../../../assets/Actions';

interface TeamRowProps {
  team: Team;
  onTeamUpdated: () => void;
  onTeamDeleted: () => void;
}

const TeamRow: React.FC<TeamRowProps> = ({ team, onTeamUpdated, onTeamDeleted }) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleView = () => {
    setViewModalOpen(true);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  return (
    <TableRow>
      <TableCell>{team.name}</TableCell>
      <TableCell>
        <Action onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        <ViewTeamModal
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          team={team}
        />
        <UpdateTeamModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          team={team}
          onTeamUpdated={onTeamUpdated}
        />
        <DeleteTeamModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          team={team}
          onTeamDeleted={onTeamDeleted}
        />
      </TableCell>
    </TableRow>
  );
};

export default TeamRow;
