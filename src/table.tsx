import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";

import Footer from "./footer.tsx";
import Header from "./header.tsx";

import type { Pagination, DataItem } from "../types.ts";
import type { Dispatch, SetStateAction } from "react";

interface TableProps {
  body: DataItem[];
  footer: Pagination;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedItems: DataItem[];
  setSelectedItems: Dispatch<SetStateAction<DataItem[]>>;
  toBeAdded: number;
  setToBeAdded: Dispatch<SetStateAction<number>>;
}

const ItemsNotSelect = (selectedItems: DataItem[], AllItems: DataItem[]) => {
  const selectedItemSet = new Set(selectedItems.map((item) => item.id));
  return AllItems.filter((item) => !selectedItemSet.has(item.id));
};

export default function Table({
  body,
  footer,
  currentPage,
  setCurrentPage,
  selectedItems,
  setSelectedItems,
  toBeAdded,
  setToBeAdded,
}: TableProps) {
  // Use Effect to reconcile tobeAdded Items
  useEffect(() => {
    if (toBeAdded > 0) {
      let ItemsNotSelected = ItemsNotSelect(selectedItems, body);
      if (toBeAdded >= ItemsNotSelected.length) {
        setToBeAdded(toBeAdded - ItemsNotSelected.length);
        setSelectedItems([...selectedItems, ...ItemsNotSelected]);
      } else {
        setSelectedItems([
          ...selectedItems,
          ...ItemsNotSelected.slice(0, toBeAdded),
        ]);
        setToBeAdded(0);
      }
    }
  }, [body]);

  return (
    <>
      <DataTable
        // Table to hold the data with all the relevant columns
        value={body}
        stripedRows
        tableStyle={{ maxWidth: "100%" }}
        selection={selectedItems}
        selectionMode="multiple"
        onSelectionChange={(e) => setSelectedItems(e.value)}
        dataKey="id"
        footer={
          <Footer
            footer={footer}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
      >
        <Column
          selectionMode="multiple"
          header={
            <Header
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              toBeAdded={toBeAdded}
              setToBeAdded={setToBeAdded}
              body={body}
            />
          }
        />
        <Column
          style={{ fontWeight: "bold", width: "25%" }}
          field="title"
          header="TITLE"
        ></Column>
        <Column field="place_of_origin" header="PLACE OF ORIGIN"></Column>
        <Column style={{}} field="artist_display" header="ARTIST"></Column>
        <Column
          // To Give a default placeholder when no data is Available.
          body={(row) =>
            typeof row.inscriptions == "string" ? (
              <div>{row.inscriptions}</div>
            ) : (
              <div>N/A</div>
            )
          }
          field="inscriptions"
          header="INSCRIPTIONS"
        ></Column>
        <Column field="date_start" header="START DATE"></Column>
        <Column field="date_end" header="END DATE"></Column>
      </DataTable>
    </>
  );
}
