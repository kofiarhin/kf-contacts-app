import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createContact } from "../../redux/contact/contactSlice";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [user]);
  const [formData, setFormData] = useState({
    name: "new contact contact",
    phoneNumber: 123344555,
    email: "test@gmail.com",
  });

  const { name, email, phoneNumber } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createContact({ name, email, phoneNumber }));
    navigate("/contacts");
  };
  return (
    <div>
      <h1 className="heading">Add Contact</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter Name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Enter phone number"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
