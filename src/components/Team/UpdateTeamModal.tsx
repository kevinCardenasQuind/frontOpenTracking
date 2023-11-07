// UpdateTeamModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Team } from '../../Models/Team';
import { updateTeam } from '../../services/teamServices';
import './TeamModal.css';

interface UpdateTeamModalProps {
  open: boolean;
  onClose: () => void;
  team: Team;
  onTeamUpdated: () => void;
}

const UpdateTeamModal: React.FC<UpdateTeamModalProps> = ({ open, onClose, team, onTeamUpdated }) => {
  const [name, setName] = useState(team.name);

  const handleUpdate = async () => {
    try {
      await updateTeam(team.id, name);
      onTeamUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="title">Update Team</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions className="actions">
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTeamModal;
