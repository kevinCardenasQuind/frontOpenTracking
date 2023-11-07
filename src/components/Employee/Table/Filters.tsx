// Filters.tsx
import React, { useState } from 'react';
import { Input, Select, MenuItem, Button } from '@material-ui/core';
import AddEmployeeModal from '../AddEmployeeModal';

interface FiltersProps {
  nameFilter: string;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  documentFilter: string;
  setDocumentFilter: React.Dispatch<React.SetStateAction<string>>;
  teamFilter: string;
  setTeamFilter: React.Dispatch<React.SetStateAction<string>>;
  teams: any[];
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  onEmployeeAdded: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  nameFilter,
  setNameFilter,
  documentFilter,
  setDocumentFilter,
  teamFilter,
  setTeamFilter,
  teams,
  itemsPerPage,
  setItemsPerPage,
  onEmployeeAdded,
}) => {
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const handleEmployeeAdded = () => {
    onEmployeeAdded();
  };

  return (
    <div>
      <Input 
        placeholder="Search by name..." 
        value={nameFilter} 
        onChange={(e) => setNameFilter(e.target.value)} 
      />
      <Input 
        placeholder="Search by document..." 
        value={documentFilter} 
        onChange={(e) => setDocumentFilter(e.target.value)} 
      />
      <Select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value as string)}>
        <MenuItem value="All">All</MenuItem>
        {teams.map(team => (
          <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New Employee
      </Button>
      <AddEmployeeModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />
      <Select 
          value={itemsPerPage} 
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
      >
          {[5, 10, 15, 20].map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
      </Select>
    </div>
  );
};

export default Filters;
