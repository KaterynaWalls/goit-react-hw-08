import { useSelector } from "react-redux";
import { selectIsLoading, selectError } from "../redux/selectors"; // Імпортуємо селектори
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";
import "./App.css";

const App = () => {
  // Отримання стану завантаження та помилки з Redux
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div>
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <h2>Loading...</h2>}
      {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
      <ContactList />
    </div>
  );
};

export default App;
