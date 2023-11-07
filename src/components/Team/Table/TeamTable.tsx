// TeamTable.tsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, Paper, Button, TextField } from '@material-ui/core';
import { getTeams } from '../../../services/teamServices';
import TeamRow from './TeamRow';
import { Team } from '../../../Models/Team';
import AddTeamModal from '../AddTeamModal';
import './TeamTable.css';

const TeamTable: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState('');

  const fetchTeams = async () => {
    try {
      const teamData = await getTeams();
      setTeams(teamData as Team[]);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleTeamUpdated = () => {
    fetchTeams();
  };

  const handleTeamDeleted = () => {
    fetchTeams();
  };

  const handleAddTeamClick = () => {
    setAddTeamModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddTeamModalOpen(false);
    fetchTeams();
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(team => {
    return nameFilter ? team.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
  });

  return (
    <Paper className="tableContainer">
      <h1 style={{ textAlign: 'center' }}>Teams List</h1>
      <TextField 
        label="Filter by name" 
        value={nameFilter} 
        onChange={(e) => setNameFilter(e.target.value)} 
      />
      <Button variant="contained" color="primary" onClick={handleAddTeamClick}>
        Add Team
      </Button>
      {filteredTeams.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeams.map((team, index) => (
              <TeamRow 
                key={index} 
                team={team} 
                onTeamUpdated={handleTeamUpdated} 
                onTeamDeleted={handleTeamDeleted}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <p style={{ textAlign: 'center' }}>No teams available. Click "Add Team" to create a new team.</p>
      )}
      <AddTeamModal open={addTeamModalOpen} onClose={handleCloseModal} onTeamAdded={fetchTeams} />
    </Paper>
  );
};

export default TeamTable;
