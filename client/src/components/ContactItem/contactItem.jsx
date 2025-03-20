import { Link } from "react-router-dom";
const contactItem = ({ data }) => {
  return (
    <Link to={`/contacts/${data._id}`} className="contact-item">
      <img src="/img/default.jpg" alt="" />
      <p className="name"> {data?.name} </p>
    </Link>
  );
};

export default contactItem;
