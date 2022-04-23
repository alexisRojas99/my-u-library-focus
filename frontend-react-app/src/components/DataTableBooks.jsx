import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Books from "../services/books";
import style from "./css/DataTableBooks.module.css";
import "./css/DataTableBooks.css";

const DataTableBooks = ({ collectionBooks, stateChecks, refreshKey }) => {
  const [dataRow, setDataRow] = useState();

  useEffect(() => {
    const getAllBooks = async () => {
      const response = await Books.getBooks();
      setDataRow(response);
    };
    getAllBooks();
  }, [refreshKey]);

  const columns = [
    { field: "id", headerName: "ISBN", width: 150 },
    { field: "title", headerName: "Title", width: 240 },
    { field: "author", headerName: "Author", width: 160 },
    { field: "genre", headerName: "Genre", width: 150 },
    {
      field: "published_year",
      headerName: "Published year",
      type: "number",
      width: 140,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 70,
    },
  ];

  const newDataRow = [];

  let rows;

  if (dataRow) {
    const dataArr = dataRow.data.dataBooks;

    dataArr.forEach((item) => {
      const jsonData = JSON.parse(JSON.stringify(item));
      jsonData["id"] = item.isbn;
      delete jsonData["isbn"];

      return newDataRow.push(jsonData);
    });

    rows = newDataRow;
  }

  const matchChekslist = (e) => {
    const dataResponseArr = dataRow.data.dataBooks;

    const newDataArr = dataResponseArr.filter((itemA) =>
      e.includes(itemA.isbn)
    );

    collectionBooks(newDataArr);
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

export default DataTableBooks;
