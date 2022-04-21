import { useState, useEffect, useCallback,useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
/* import { CustomerService } from "../service/CustomerService";
 */ import Books from "../services/books";
const EpicTable = () => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [books, setBooks] = useState(null);
  /*   const [selectAll, setSelectAll] = useState(false);
   */ const [selectedBooks, setSelectedBooks] = useState(null);
  const [lazyParams, setLazyParams] = useState({
    page: 1,
    pageSize: 10,
    filters: {
      author: { value: "", matchMode: "contains" },
      title: { value: "", matchMode: "contains" },
      genre: { value: "", matchMode: "contains" },
    },
  });

  const loadLazyTimeout= useRef(null); 
  //let loadLazyTimeout = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = useCallback(() => {
    setLoading(true);

    if (loadLazyTimeout.current) {
      clearTimeout(loadLazyTimeout.current);
    }

    //imitate delay of a backend call
    loadLazyTimeout.current = setTimeout(async () => {
      const {
        data: { totalRecords, dataBooks },
      } = await Books.getBooks(
        lazyParams.page,
        lazyParams.pageSize,
        lazyParams.filters?.author?.value,
        lazyParams.filters?.title?.value,
        lazyParams.filters?.genre?.value
      );
      setTotalRecords(totalRecords);
      setBooks([...dataBooks]);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  },[lazyParams]);

  const onPage = ({ rows, page, filters }) => {
    setLazyParams((prev) => ({
      page: prev.page||page,
      pageSize: rows,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  };

  const onFilter = (event) => {
    event["first"] = 0;
    const { rows, page, filters } = event;
    setLazyParams((prev) => ({
      page:prev.page||page,
      pageSize: rows,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  };

  const onSelectionChange = (event) => {
    const value = event.value;
    setSelectedBooks(value);
    /*     setSelectAll(value.length === totalRecords);
     */
  };

  /*   const onSelectAllChange = async (event) => {
    const selectAll = event.checked;

    if (selectAll) {
      customerService.getCustomers().then((data) => {
        setSelectAll(true);
        setSelectedBooks(data.customers);
      });
    } else {
      setSelectAll(false);
      setSelectedBooks([]);
    }
  };
 */
  return (
    <div>
      <div className="card">
        <DataTable
          value={books}
          lazy
          filterDisplay="row"
          responsiveLayout="scroll"
          dataKey="isbn"
          paginator
          rows={10}
          totalRecords={totalRecords}
          onPage={onPage}
          onFilter={onFilter}
          filters={lazyParams.filters}
          loading={loading}
          selection={selectedBooks}
          onSelectionChange={onSelectionChange}
          /*           onSelectAllChange={onSelectAllChange}
           */
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column field="isbn" header="ISBN" />
          <Column
            field="title"
            header="Title"
            filter
            filterPlaceholder="Search by title"
          />
          <Column
            field="author"
            filter
            header="Author"
            filterPlaceholder="Search by author"
          />

          <Column
            field="genre"
            filter
            header="Genre"
            filterPlaceholder="Search by genre"
          />
          <Column field="published_year" header="Published Year" />
          <Column field="stock" header="Stock" />
        </DataTable>
      </div>
    </div>
  );
};

export default EpicTable;
