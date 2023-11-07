import EmployeeTable from '../../components/Employee/Table/EmployeeTable';
import './HomePage.css';

function HomePage() {
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
}

export default HomePage;
