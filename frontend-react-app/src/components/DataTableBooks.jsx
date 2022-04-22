import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Books from "../services/books";
import style from "./css/DataTableBooks.module.css";

const DataTableBooks = ({ collectionBooks, stateChecks }) => {
  const [dataRow, setDataRow] = useState();

  useEffect(() => {
    const getAllBooks = async () => {
      const response = await Books.getBooks();
      setDataRow(response);
    };
    getAllBooks();
  }, []);

  const columns = [
    { field: "id", headerName: "ISBN", width: 150 },
    { field: "title", headerName: "Title", width: 225 },
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
      width: 60,
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

  return (
    <div className={style.contentDataTable}>
      <div style={{ height: 400, width: "52%" }}>
        {dataRow && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onRowClick={(e) => collectionBooks(e)}
            isRowSelectable={() => stateChecks??true}
          />
        )}
      </div>
    </div>
  );
};

export default DataTableBooks;
