import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Team } from '../../Models/Team';
import './TeamModal.css';

interface ViewTeamModalProps {
  open: boolean;
  onClose: () => void;
  team: Team;
}

const ViewTeamModal: React.FC<ViewTeamModalProps> = ({ open, onClose, team }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="title">View Team</DialogTitle>
      <DialogContent>
        Name: {team.name}
      </DialogContent>
      <DialogActions className="actions">
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTeamModal;