// DeleteEmployeeModal.tsx
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Snackbar, SnackbarContent, DialogContentText
} from '@material-ui/core';
import { deleteEmployee } from '../../services/employeeServices';
import './EmployeeModal.css';

interface DeleteEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  document: string;
  onEmployeeDeleted: () => void;
}

const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({ open, onClose, document, onEmployeeDeleted }) => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteEmployee(document);
      onEmployeeDeleted();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="title">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this employee?
        </DialogContentText>
      </DialogContent>
      <DialogActions className="actions">
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message="Employee deleted successfully!"
        />
      </Snackbar>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEmployeeModal;