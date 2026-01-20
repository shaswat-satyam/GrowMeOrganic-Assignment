import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";

import Overlay from "./header.tsx";
import PaginationFooter from "./footer.tsx";

import type { Pagination, DataItem } from "../types.ts";
import type { Dispatch, SetStateAction } from "react";

interface TableProps {
  dataItemsInTableBody: DataItem[];
  PaginationData: Pagination;
  currentPageNumber: number;
  setCurrentPageNumber: Dispatch<SetStateAction<number>>;
  selectedItemsIds: DataItem["id"][];
  setSelectedItemsIds: Dispatch<SetStateAction<DataItem["id"][]>>;
  numberOfItemsYetToBeAdded: number;
  setNumberOfItemsYetToBeAdded: Dispatch<SetStateAction<number>>;
}

const ItemsNotSelect = (
  selectedItemsIds: DataItem["id"][],
  AllItems: DataItem[],
) => {
  const selectedItemsIdset = new Set(selectedItemsIds);
  return AllItems.filter((item) => !selectedItemsIdset.has(item.id)).map(
    (item) => item.id,
  );
};

export default function Table({
  dataItemsInTableBody,
  PaginationData,
  currentPageNumber,
  setCurrentPageNumber,
  selectedItemsIds,
  setSelectedItemsIds,
  numberOfItemsYetToBeAdded,
  setNumberOfItemsYetToBeAdded,
}: TableProps) {
  // Use Effect to reconcile numberOfItemsYetToBeAdded Items
  useEffect(() => {
    if (numberOfItemsYetToBeAdded > 0) {
      let ItemsNotSelected = ItemsNotSelect(
        selectedItemsIds,
        dataItemsInTableBody,
      );
      if (numberOfItemsYetToBeAdded >= ItemsNotSelected.length) {
        setNumberOfItemsYetToBeAdded(
          numberOfItemsYetToBeAdded - ItemsNotSelected.length,
        );
        setSelectedItemsIds([...selectedItemsIds, ...ItemsNotSelected]);
      } else {
        setSelectedItemsIds([
          ...selectedItemsIds,
          ...ItemsNotSelected.slice(0, numberOfItemsYetToBeAdded),
        ]);
        setNumberOfItemsYetToBeAdded(0);
      }
    }
  }, [dataItemsInTableBody]);

  return (
    <>
      <DataTable
        // Table to hold the data with all the relevant columns
        value={dataItemsInTableBody}
        stripedRows
        tableStyle={{ maxWidth: "100%" }}
        selection={dataItemsInTableBody.filter((item) =>
          selectedItemsIds.includes(item.id),
        )}
        selectionMode="multiple"
        onSelectionChange={(e) => setSelectedItemsIds(e.value.map((e) => e.id))}
        dataKey="id"
        footer={
          <PaginationFooter
            paginationData={PaginationData}
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
          />
        }
      >
        <Column
          selectionMode="multiple"
          header={
            <Overlay
              selectedItemsIds={selectedItemsIds}
              setSelectedItemsIds={setSelectedItemsIds}
              numberOfItemsYetToBeAdded={numberOfItemsYetToBeAdded}
              setNumberOfItemsYetToBeAdded={setNumberOfItemsYetToBeAdded}
              dataItemsInTableBody={dataItemsInTableBody}
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
