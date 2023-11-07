import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, Paper, TableCell, Button } from '@material-ui/core';

import { getEmployees } from '../../../services/employeeServices';
import { getTeams } from '../../../services/teamServices';
import { Employee } from '../../../Models/Employee';
import Pagination from './Pagination';
import Filters from './Filters';
import EmployeeRow from './EmployeeRow';
import { TeamProvider } from '../../../context/TeamContext';
import AddEmployeeModal from '../AddEmployeeModal';

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [documentFilter, setDocumentFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchEmployeesAndTeams = async () => {
    try {
      const employeeData = await getEmployees();
      const teamData = await getTeams();
      setEmployees(employeeData as Employee[]);
      setTeams(teamData);
    } catch (error) {
      console.error('Error fetching employees and teams:', error);
    }
  };

  const handleEmployeeDeleted = async () => {
    await fetchEmployeesAndTeams();
  };

  const handleEmployeeAdded = () => {
    fetchEmployeesAndTeams();
  };

  useEffect(() => {
    fetchEmployeesAndTeams();
  }, []);

  const filteredEmployees = employees ? employees.filter(employee => {
    const nameMatches = nameFilter ? employee.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
    const documentMatches = documentFilter ? employee.document.includes(documentFilter) : true;
    const teamMatches = teamFilter !== 'All' ? employee.team_id === teamFilter : true;

    return nameMatches && documentMatches && teamMatches;
  }) : [];

  useEffect(() => {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredEmployees.length, itemsPerPage, currentPage]);

  const displayedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleAddNew = () => {
    if (teams.length === 0) {
      window.alert('You must create a team first');
      return;
    }
    else{
      setIsAddModalOpen(true);
    }
  };

  const handleEmployeeAdd = () => {
    handleEmployeeAdded();
  };

  // Verificación de datos antes de renderizar
  if (!employees || !teams ) {
    return (
      <TeamProvider teams={teams} setTeams={setTeams}>
        <Paper>
          <h1 style={{ textAlign: 'center' }}>Employees</h1>
          <p>No data available</p>
          <Button variant="contained" color="primary" onClick={handleAddNew}>
          Add New Employee
          </Button>
          {teams.length !== 0 && (
          <AddEmployeeModal
            open={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onEmployeeAdded={handleEmployeeAdd}
          />
        )}
        </Paper>
      </TeamProvider>
    );
  }

  return (
    <TeamProvider teams={teams} setTeams={setTeams}>
      {(!employees || employees.length === 0 || !teams || teams.length === 0) ? (
        <Paper>
          <h1 style={{ textAlign: 'center' }}>Employees</h1>
          <p>No data available</p>
          <Button variant="contained" color="primary" onClick={handleAddNew}>
          Add New Employee
          </Button>
          {teams.length !== 0 && (
          <AddEmployeeModal
            open={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onEmployeeAdded={handleEmployeeAdd}
          />
          )}
        </Paper>
      ) : (
        <Paper>
          <h1 style={{ textAlign: 'center' }}>Employees</h1>
          <Filters
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            documentFilter={documentFilter}
            setDocumentFilter={setDocumentFilter}
            teamFilter={teamFilter}
            setTeamFilter={setTeamFilter}
            teams={teams}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            onEmployeeAdded={handleEmployeeAdded}
          />
          <Table className="mui-table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>CEDULA</TableCell>
                <TableCell>CREATE AT</TableCell>
                <TableCell>TEAM</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedEmployees.map((employee, index) => {
                const teamName = teams.find(team => team.id === employee.team_id)?.name || employee.team_id;
                return (
                  <EmployeeRow
                    key={index}
                    employee={{
                      ...employee,
                      created_at: formatDate(employee.created_at),
                      updated_at: formatDate(employee.updated_at),
                    }}
                    teamName={teamName}
                    onEmployeeDeleted={handleEmployeeDeleted}
                    onEmployeeUpdated={fetchEmployeesAndTeams}
                  />
                );
              })}
            </TableBody>
          </Table>
          <Pagination
            totalItems={filteredEmployees.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Paper>
      )}
    </TeamProvider>
  );
}
export default EmployeeTable;
