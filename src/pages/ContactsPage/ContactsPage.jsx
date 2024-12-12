import { useDispatch, useSelector } from "react-redux";
import  { useEffect } from "react";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import { selectIsLoading, selectError, selectContacts } from "../../redux/contacts/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import s from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Fetching contacts...");
      dispatch(fetchContacts());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div className={s.contactsPage}>
      <DocumentTitle>Phonebook</DocumentTitle>
      <ContactForm />
      <SearchBox />
      {isLoading && <p className={s.loadingText}>Request in progress...</p>}
      {error && <p className={s.errorText}>Error: {error}</p>}
     
      {/* {!isLoading && !error && contacts.length === 0 && (
        <p className={s.noContacts}>No contacts found</p>
      )} */}

      {!isLoading && !error && contacts.length > 0 && <ContactList contacts={contacts} />}
    </div>
  );
};
export default ContactsPage;
