// import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";

// const [rowClick, setRowClick] = useState(false);
// const [selectedProducts, setSelectedProducts] = useState([]);
let dataToFooter = (start: number, end: number, total: number) =>
  `Showing ${start} to ${end} of ${total} entries`;

// let addToSelectedProducts = (target) => {
//   let result = selectedProducts;
//   result.append(target.id);
//   setSelectedProducts(result);
// };

export default function Table({
  body,
  footer,
  currentPage:,
  setCurrentPage: ,
}) {
  return (
    <>
      {/* <InputSwitch checked={rowClick} onChange={(e) => setRowClick(e.value)} /> */}
      {/* {JSON.stringify(data)} */}
      {/* {JSON.stringify(footer)} */}
      <DataTable
        value={body}
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        // selectionMode={rowClick ? null : "checkbox"}
        // selection={selectedProducts}
        // onSelectionChange={(e) => addToSelectedProducts(e.value)}
        dataKey="id"
        footer={
          <div>
            <p>
              {dataToFooter(
                footer.offset + 1,
                footer.offset + footer.limit,
                footer.total,
              )}
            </p>
            <div>
              <Button
                size="small"
                outlined={true}
                label="Previous"
                disabled={currentPage == 1}
                onClick={(_) => setCurrentPage(currentPage - 1)}
              />
              <Button
                size="small"
                outlined={currentPage != currentPage}
                label={currentPage}
              />
              <Button
                size="small"
                outlined={currentPage + 1 != currentPage}
                label={currentPage + 1}
              />
              <Button
                size="small"
                outlined={currentPage + 1 != currentPage}
                label={currentPage + 2}
                onClick={(_) => setCurrentPage(currentPage + 2)}
              />
              <Button
                size="small"
                outlined={currentPage + 3 != currentPage}
                label={currentPage + 3}
                onClick={(_) => setCurrentPage(currentPage + 3)}
              />
              <Button
                size="small"
                outlined={currentPage + 3 != currentPage}
                label={currentPage + 4}
                onClick={(_) => setCurrentPage(currentPage + 3)}
              />
              <Button
                size="small"
                outlined={true}
                label="Next"
                disabled={currentPage == footer.total_pages}
                onClick={(_) => setCurrentPage(currentPage + 1)}
              />
            </div>
          </div>
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
