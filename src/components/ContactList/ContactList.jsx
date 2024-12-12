import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectFilteredContacts,
  selectIsLoading,
  selectError,
} from "../../redux/contacts/selectors.js";

import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { fetchContacts } from "../../redux/contacts/operations.js";
import { useEffect } from "react";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const visibleContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  console.log("All Contacts:", contacts); 
  console.log("Filtered Contacts:", visibleContacts); 
  console.log("Loading State:", isLoading); 
  console.log("Error State:", error); 


  useEffect(() => {
    if (!contacts || contacts.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, contacts]);

  if (isLoading) {
    return (
      <div className={s.loader}>
        <p>Loading contacts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        <p>{error}</p>
        <button onClick={() => dispatch(fetchContacts())}>Retry</button>
      </div>
    );
  }

  if (visibleContacts.length === 0 && !isLoading && !error) {
    return <p>No contacts found</p>
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
