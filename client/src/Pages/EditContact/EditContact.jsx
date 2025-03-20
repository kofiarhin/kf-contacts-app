import "./editContact.styles.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContact, editContact } from "../../redux/contact/contactSlice";
import { useParams, useNavigate } from "react-router-dom";

// edit contact
const EditContact = () => {
  const { currentContact } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    dispatch(getContact(id));
    if (currentContact) {
      setFormData({
        ...currentContact,
      });
    }
  }, []);

  const { name, email, phoneNumber } = formData;
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      id,
      name,
      email,
      phoneNumber,
    };

    dispatch(editContact(dataToSubmit));
    navigate("/contacts");
  };

  return (
    <div>
      <h1 className="heading">Edit Contact</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <button>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
