import React, { useState, useContext } from "react";
import DataTableBooks from "../components/DataTableBooks";
import ButtonComponent from "../components/ButtonComponent";
import style from "./css/HomePage.module.css";
import BooksRecords from "../services/books-records/index";
import AuthContext from "../contexts/AuthContext";

const HomePage = () => {
  const [message, setMessage] = useState(false);
  const [select, setSelected] = useState([]);
  const [stateCheckBox, setStateCheckBox] = useState(null);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  const saveSelected = (e) => {
    setSelected((prev) => [...prev, e]);
    setError(false);
  };

  const reserveBook = async () => {
    if (select.length === 0) {
      return setError("you must select any element");
    }
    select.forEach(async (item) => {
      await BooksRecords.createBooksRecords(user.id, item.row.id, 1, "entry");
    });
    setMessage("Successful");
    setStateCheckBox(false);
    setTimeout(() => {
      setMessage(false);
      setStateCheckBox(null);
    }, 2000);
  };
  return (
    <>
      <DataTableBooks
        collectionBooks={(e) => saveSelected(e)}
        stateChecks={stateCheckBox}
      />
      <div className={style.contentButton}>
        <ButtonComponent
          label="Reserve book"
          type="button"
          onClick={() => {
            reserveBook();
          }}
        />
      </div>
      {message && (
        <center>
          <h4>{message}</h4>
        </center>
      )}
      {error && (
        <center>
          <h4>{error}</h4>
        </center>
      )}
    </>
  );
};

export default HomePage;
