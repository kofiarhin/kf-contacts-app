import "./contactList.styles.scss";
import ContactItem from "../ContactItem/contactItem";

// contactlist
const ContactList = ({ data }) => {
  return (
    <div className="contacts-wrapper">
      {data.map((item) => (
        <ContactItem key={item._id} data={item} />
      ))}
    </div>
  );
};

export default ContactList;
