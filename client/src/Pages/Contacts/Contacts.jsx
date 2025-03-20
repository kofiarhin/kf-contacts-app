import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContacts } from "../../redux/contact/contactSlice";
import ContactList from "../../components/ContactList/ContactList";

// contacts
const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts, isLoading } = useSelector((state) => state.contact);

  console.log(contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  if (isLoading) {
    return (
      <>
        {" "}
        <h1> Loading.... </h1>{" "}
      </>
    );
  }
  return (
    <div>
      <h1 className="heading">Contacts</h1>
      {contacts.length > 0 ? (
        <ContactList data={contacts} />
      ) : (
        <h1 className="heading">You have no contacts</h1>
      )}
    </div>
  );
};

export default Contacts;
