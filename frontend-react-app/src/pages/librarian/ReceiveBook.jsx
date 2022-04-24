import React, { useState } from "react";
import DataTableReceive from "../../components/DataTableReceive";
import ButtonComponent from "../../components/ButtonComponent";
import style from "./css/ReceiveBook.module.css";
import BooksRecords from "../../services/books-records";
import Books from "../../services/books";

const ReceiveBook = () => {
  const [select, setSelected] = useState([]);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [stateCheckBox, setStateCheckBox] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const saveSelected = (e) => {
    setSelected(e);
    setError(false);
  };

  const receiveBook = async () => {
    if (select.length === 0) {
      return setError("you must select any element");
    }

    select.forEach(async (item, i) => {
      const responseBooksRecords = await BooksRecords.getAllBooksRecords(
        item.id_user
      );

      const match = responseBooksRecords.data.dataBooksRecords?.find((itemA) =>
        select.find((itemB) => itemA.isbn === itemB.isbn)
      );

      if (match !== undefined) {
        await BooksRecords.updateBooksRecords(
          match?.isbn,
          item.id_user,
          item.isbn,
          Number(responseBooksRecords.data.dataBooksRecords[i]?.quantity - 1),
          "entry"
        );
      }

      const stockDecrease = Number(item.Book.stock) + 1;
      await Books.updateBook(
        item.isbn,
        item.Book.title,
        item.Book.author,
        Number(item.Book.published_year),
        item.Book.genre,
        stockDecrease
      );

      setRefreshKey((oldKey) => oldKey + 1);
    });
    setMessage("Successful");
    setStateCheckBox(false);
    setTimeout(() => {
      setMessage(false);
      setStateCheckBox(null);
    }, 2500);
  };

  return (
    <>
      <DataTableReceive
        refreshKey={refreshKey}
        stateChecks={stateCheckBox}
        collectionBooks={(e) => saveSelected(e)}
      />
      <div className={style.contentButton}>
        <ButtonComponent
          label="Receive book"
          type="button"
          onClick={() => {
            receiveBook();
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

export default ReceiveBook;
