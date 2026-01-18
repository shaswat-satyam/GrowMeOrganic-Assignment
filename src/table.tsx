// import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { InputSwitch } from "primereact/inputswitch";
import Footer from "./footer.tsx";

import type { Pagination, DataItem } from "../types.ts";

import type { Dispatch, SetStateAction } from "react";
interface TableProps {
  body: DataItem[];
  footer: Pagination;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

// const [rowClick, setRowClick] = useState(false);
// const [selectedProducts, setSelectedProducts] = useState([]);
// let addToSelectedProducts = (target) => {
//   let result = selectedProducts;
//   result.append(target.id);
//   setSelectedProducts(result);
// };

export default function Table({
  body,
  footer,
  currentPage,
  setCurrentPage,
}: TableProps) {
  return (
    <>
      {/* <InputSwitch checked={rowClick} onChange={(e) => setRowClick(e.value)} /> */}
      <DataTable
        value={body}
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        // selectionMode={rowClick ? null : "checkbox"}
        // selection={selectedProducts}
        // onSelectionChange={(e) => addToSelectedProducts(e.value)}
        dataKey="id"
        footer={
          <Footer
            footer={footer}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
      >
        <Column selectionMode="multiple" />
        <Column field="title" header="TITLE"></Column>
        <Column field="place_of_origin" header="PLACE_OF_ORIGIN"></Column>
        <Column field="artist_display" header="ARTIST"></Column>
        <Column field="inscriptions" header="INSCRIPTIONS"></Column>
        <Column field="date_start" header="START DATE"></Column>
        <Column field="date_end" header="END DATE"></Column>
      </DataTable>
    </>
  );
}
