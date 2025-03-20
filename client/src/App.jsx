import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./app.styles.scss";
import Header from "./components/Header/header";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddContact from "./Pages/AddContact/AddContact";
import PrivateRoute from "./components/PrivateRoute";
import Contacts from "./Pages/Contacts/Contacts";
import Contact from "./Pages/Contact/Contact";
import EditContact from "./Pages/EditContact/EditContact";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contacts/:id" element={<Contact />} />
            <Route path="/contacts/edit/:id" element={<EditContact />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-contact" element={<AddContact />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
