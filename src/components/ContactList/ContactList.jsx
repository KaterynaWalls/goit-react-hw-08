import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredContacts,
  selectIsLoading,
  selectError,
} from "../../redux/selectors.js";
import { selectNameFilter } from "../../redux/filtersSlice.js";
import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { fetchContacts } from "../../redux/contactsOps.js";
import { useEffect } from "react";

const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading contacts...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <ul className={s.contactList}>
        {visibleContacts.map(({ id, name, number }) => (
          <Contact key={id} id={id} name={name} number={number} />
        ))}
      </ul>
    </div>
  );
};
export default ContactList;
