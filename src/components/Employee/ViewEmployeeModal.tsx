// ViewEmployeeModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import './EmployeeModal.css';

interface ViewEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employee: {
    name: string;
    document: string;
    team_id: string;
    created_at: string;
    updated_at: string;
  };
  teamName: string;
}

const ViewEmployeeModal: React.FC<ViewEmployeeModalProps> = ({ open, onClose, employee, teamName }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="title">View Employee Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1"><strong>Name:</strong> {employee.name}</Typography>
        <Typography variant="body1"><strong>Document:</strong> {employee.document}</Typography>
        <Typography variant="body1"><strong>Team:</strong> {teamName}</Typography>
        <Typography variant="body1"><strong>Created At:</strong> {employee.created_at}</Typography>
        <Typography variant="body1"><strong>Updated At:</strong> {employee.updated_at}</Typography>
      </DialogContent>
      <DialogActions className="actions">
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewEmployeeModal;
