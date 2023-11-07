import TeamTable from "../../components/Team/Table/TeamTable";

function TeamPage() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  
    if (!isLoggedIn) {
      window.location.href = '/login';
      return null;
    }
  
    return (
      <div className="table-container">
        <TeamTable />
      </div>
    );
  }
  
  export default TeamPage;