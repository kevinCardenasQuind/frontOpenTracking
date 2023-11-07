import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useTeams } from '../../context/TeamContext';
import { updateEmployee } from '../../services/employeeServices';
import { AxiosError } from 'axios';
import './EmployeeModal.css';

interface UpdapteEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onEmployeeUpdated: () => void;
  employee: {
    name: string;
    document: string;
    team_id: string;
  };
}

const UpdapteEmployeeModal: React.FC<UpdapteEmployeeModalProps> = ({ open, onClose, onEmployeeUpdated, employee }) => {
  const { teams } = useTeams();
  const [name, setName] = useState(employee.name);
  const [document, setDocument] = useState(employee.document);
  const [team_id, setTeamId] = useState(employee.team_id);

  useEffect(() => {
    setName(employee.name);
    setDocument(employee.document);
    setTeamId(employee.team_id);
  }, [employee]);

  const handleSubmit = async () => {
    try {
      await updateEmployee({ name, document, team_id });
      onEmployeeUpdated();
      onClose();
    } catch (error: any) {
      const e = error as AxiosError;
      if (e.response) {
        const status = e.response.status;
        const message = e.response.data;
        window.alert(`Error (${status}): ${message}`);
      } else if (e.request) {
        window.alert('No se recibió ninguna respuesta del servidor.');
      } else {
        window.alert('Error: ' + e.message);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="title">Edit Employee</DialogTitle>
      <DialogContent>
        <TextField
          label="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={name === '' || document === '' || team_id === ''}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdapteEmployeeModal;
