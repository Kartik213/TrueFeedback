import UserDashboard from "../components/UserDashboard";
import DashboardNav from "../components/DashboardNav";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  return(
    <>
      <DashboardNav username={username} />
      <UserDashboard />
    </>
  )
};

export default Dashboard;
