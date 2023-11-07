import EmployeeTable from "../../components/Employee/Table/EmployeeTable";

const EmployeePage: React.FC = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        window.location.href = '/login';
        return null;
      }
    
      return (
        <div className="table-container">
          <EmployeeTable />
        </div>
      );
};

export default EmployeePage;