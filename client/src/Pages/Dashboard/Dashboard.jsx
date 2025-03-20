import "./dashboard.styles.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// dashboard
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div>
      <div className="profile-wrapper">
        <img src="/img/default.jpg" alt="" />
        <h2> {user?.name} </h2>
        <p> {user?.email} </p>
      </div>
    </div>
  );
};

export default Dashboard;
