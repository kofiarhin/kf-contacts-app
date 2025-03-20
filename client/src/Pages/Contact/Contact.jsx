import "./contact.styles.scss";
import { getContact } from "../../redux/contact/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { deleteContact } from "../../redux/contact/contactSlice";

// contact
const Contact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentContact } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getContact(id));
  }, [currentContact]);

  const handleDelete = async () => {
    dispatch(deleteContact(id));
    navigate("/contacts");
  };
  return (
    <div>
      {currentContact && (
        <div className="current-contact">
          {" "}
          <img src="/img/default.jpg" alt="" />
          <h2 className="heading"> {currentContact.name} </h2>{" "}
          <p className="phone-number">
            {" "}
            <FaPhone /> {currentContact.phoneNumber}{" "}
          </p>
          <div className="button-wrapper">
            <button className="danger" onClick={handleDelete}>
              Delete Contact
            </button>
            <Link to={`/contacts/edit/${currentContact._id}`}>
              {" "}
              Edit Contact{" "}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
