import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BooksRecords from "../services/books-records/index";
import style from "./css/DataTableBooks.module.css";
import "./css/DataTableBooks.css";
import moment from 'moment'

const DataTableReceive = ({ collectionBooks, stateChecks, refreshKey }) => {
  const [dataRow, setDataRow] = useState();

  useEffect(() => {
    const getAllBooks = async () => {
      const response = await BooksRecords.getAllBooksRecords();
      setDataRow(response);
    };
    getAllBooks();
  }, [refreshKey]);

  const columns = [
    { field: "id", headerName: "cant", width: 50 },
    { field: "username", headerName: "Student email", width: 200 },
    { field: "id_user", headerName: "Student Id", width: 100 },
    { field: "isbn", headerName: "ISBN", width: 150 },
    { field: "title", headerName: "Title", width: 240 },
    { field: "author", headerName: "Author", width: 160 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 70, type: "number" },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 70,
    },
    { field: "movement_type", headerName: "Movement", width: 95 },
    { field: "movement_date", headerName: "Movement Date", width: 200 },
  ];

  const newDataRow = [];

  let rows;

  if (dataRow) {
    const dataArr = dataRow.data.dataBooksRecords;

    dataArr.forEach((element, i) => {
      newDataRow.push({
        id: i + 1,
        username: element.User.email,
        id_user: element.id_user,
        isbn: element.isbn,
        title: element.Book.title,
        author: element.Book.author,
        genre: element.Book.genre,
        stock: element.Book.stock,
        quantity: element.quantity,
        movement_type: element.movement_type,
        movement_date: `${moment(element.movement_date).format("L")} ${new Date(
          element.movement_date
        ).getHours()}:${new Date(
          element.movement_date
        ).getMinutes()}:${new Date(element.movement_date).getSeconds()}`,
      });
    });

    rows = newDataRow;
  }

  const matchChekslist = (e) => {
    const dataMap = [];
    const dataResponseArr = dataRow.data.dataBooksRecords;
    dataResponseArr.forEach((item, i) => {
      const jsonData = JSON.parse(JSON.stringify(item));
      jsonData["id"] = i + 1;

      return dataMap.push(jsonData);
    });

    const newDataArr = dataMap.filter((itemA) =>
      e.includes(itemA.id)
    );

    // console.log('array', newDataArr);
    // console.log(e);

    // collectionBooks(newDataArr);
  };
  return (
    <div className={style.contentDataTable}>
      <div style={{ height: "auto", width: "100%" }}>
        {dataRow && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(e) => {
              matchChekslist(e);
            }}
            isRowSelectable={() => stateChecks ?? true}
            autoHeight
          />
        )}
      </div>
    </div>
  );
};

export default DataTableReceive;
