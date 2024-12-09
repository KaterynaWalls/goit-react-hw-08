import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DocumentTitle from "../../DocumentTitle";
import { selectIsLoading, selectError } from "../redux/contacts/selectors"; // Імпортуємо селектори
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import s from "./ContactsPage.module.css";
import { fetchContacts } from "../../redux/contacts/operations";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.contactsPage}>
      <DocumentTitle>Phonebook</DocumentTitle>

      <ContactForm />
      <SearchBox />
      {isLoading && <p className={s.loadingText}>Request in progress...</p>}
      {error && <p className={s.errorText}>Error: {error}</p>}
      <ContactList />
    </div>
  );
};

export default ContactsPage;
