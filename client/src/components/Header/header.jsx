import "./header.styles.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
const header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // handle lgoout
  const handleLogout = async () => {
    dispatch(logout());
  };
  return (
    <header className="main-header">
      <Link to="/">
        <h1 className="heading">LinkNest</h1>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}> Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default header;
