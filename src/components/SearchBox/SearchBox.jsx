import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filters/slice";
import s from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter) || "";
  

  const handleSearchUser = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={s.searchWrap}>
      <label>
        Find contact by name
        <input
          className={s.searchInput}
          type="text"
          value={filter}
          onChange={handleSearchUser}
        />
      </label>
    </div>
  );
};

export default SearchBox;
