import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { Team } from '../../Models/Team';
import { deleteTeam } from '../../services/teamServices';
import './TeamModal.css';
import { AxiosError } from 'axios';

interface DeleteTeamModalProps {
  open: boolean;
  onClose: () => void;
  team: Team;
  onTeamDeleted: () => void;
}

const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({ open, onClose, team, onTeamDeleted }) => {

  const handleDelete = async () => {
    try {
      await deleteTeam(team.id);
      onTeamDeleted();
      onClose();
    } catch (error : any) {
      const e = error as AxiosError;
      if (e.response) {
        const message = e.response.data;
        window.alert(`${message}`);
      } else if (e.request) {
        window.alert('Dont have response');
      } else {
        window.alert('Error: ' + e.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="title">Confirm Deletion</DialogTitle>
      <DialogActions>
        Are you sure you want to delete this team?
      </DialogActions>
      <DialogActions className="actions">
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTeamModal;
