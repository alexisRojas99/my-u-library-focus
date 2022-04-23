import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import getAllBooksRecords from "../services/books-records";
import style from "./css/DataTableBooks.module.css";
import moment from "moment";

const DataTableSimple = ({ collectionBooks, stateChecks }) => {
  const [dataRow, setDataRow] = useState();

  useEffect(() => {
    const getAllBooks = async () => {
      // const response = await Books.getBooks();
      const { data } = await getAllBooksRecords.getAllBooksRecords();

      setDataRow(data);
    };
    getAllBooks();
  }, []);

  const columns = [
    { field: "id", headerName: "cant", width: 20 },
    { field: "isbn", headerName: "ISBN", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },
    {
      field: "published_year",
      headerName: "Published year",
      type: "number",
      width: 140,
    },
    { field: "quantity", headerName: "Quantity", width: 70, type: "number" },
    { field: "movement_type", headerName: "Movement", width: 95 },
    { field: "movement_date", headerName: "Movement Date", width: 200 },
  ];

  const newDataRow = [];

  let rows;

  if (dataRow) {
    const dataArr = dataRow.dataBooksRecords;

    dataArr.forEach((element, i) => {
      
      newDataRow.push({
        id: i + 1,
        isbn: element.isbn,
        title: element.Book.title,
        author: element.Book.author,
        genre: element.Book.genre,
        published_year: element.Book.published_year,
        quantity: element.quantity,
        movement_type: element.movement_type,
        movement_date: `${moment(element.movement_date).format("L")} ${
          new Date(element.movement_date).getHours()
        }:${new Date(element.movement_date).getMinutes()}:${new Date(
          element.movement_date
        ).getSeconds()}`,
      });
    });

    rows = newDataRow;
  }

  return (
    <div className={style.contentDataTable}>
      <div style={{ height: "auto", width: "100%" }}>
        {dataRow && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // onRowClick={(e) => collectionBooks(e)}
            isRowSelectable={() => stateChecks ?? true}
            autoHeight
          />
        )}
      </div>
    </div>
  );
};

export default DataTableSimple;
