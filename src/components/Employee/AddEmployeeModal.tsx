import React, { useState } from 'react';
import { AxiosError } from 'axios';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, Button, Select, MenuItem,
  InputLabel, FormControl, Snackbar, SnackbarContent
} from '@material-ui/core';
import { useTeams } from '../../context/TeamContext';
import { createEmployee } from '../../services/employeeServices';
import './EmployeeModal.css';

interface AddEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onEmployeeAdded: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ open, onClose, onEmployeeAdded }) => {
  const { teams } = useTeams();
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [team_id, setTeamId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await createEmployee({ name, document, team_id });
      onEmployeeAdded();
      setSnackbarOpen(true);
      resetForm();
    } catch (error: any) {
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
    setDocument('');
    setTeamId('');
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="title">Add New Employee</DialogTitle>
      <DialogContent>
        <TextField
          label="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Document*"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
            <InputLabel id="team-label">Team*</InputLabel>
            <Select
            labelId="team-label"
            value={team_id}
            onChange={(e) => setTeamId(e.target.value as string)}
            >
            {teams.map(team => (
                <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
            ))}
            </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="actions">
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          disabled={name === '' || document === '' || team_id === ''}
        >
          Add
        </Button>
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        >
        <SnackbarContent
          message="Employee added successfully!"
        />
      </Snackbar>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
