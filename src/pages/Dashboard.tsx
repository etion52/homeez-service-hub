import NavBarWrapper from "@/components/NavBarWrapper";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBarWrapper />
      
      {/* Rest of Dashboard page content */}
      <div className="pt-20">
        <h1>Dashboard page</h1>
      </div>
    </div>
  );
};

export default Dashboard;
