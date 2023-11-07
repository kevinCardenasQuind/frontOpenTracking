import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { createTeam } from '../../services/teamServices';
import './TeamModal.css';
import { AxiosError } from 'axios';

interface AddTeamModalProps {
  open: boolean;
  onClose: () => void;
  onTeamAdded: () => void;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({ open, onClose, onTeamAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    try {
      await createTeam(name);
      onTeamAdded();
      resetForm();
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

  const resetForm = () => {
    setName('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="title">Add New Team</DialogTitle>
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
        <Button
        disabled={name === '' }
        onClick={handleSubmit} 
        color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTeamModal;
