import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import s from "./Contact.module.css";

import { FaUser, FaPhone } from "react-icons/fa";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  // const handleDelete = () => {
  //   dispatch(deleteContact(id));
  // };

  return (
    <li className={s.contactItem}>
      <div className={s.contactInfo}>
        <p className={s.contactName}>
          <FaUser className={s.icon} /> <span>{name}</span>
        </p>

        <div className={s.contactNumber}>
          <FaPhone className={s.icon} /> <span>{number}</span>
        </div>
      </div>

      <button
        className={s.delButton}
        type="button"
        onClick={() => dispatch(deleteContact(id))}
        aria-label={`Delete contact ${name}`}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
