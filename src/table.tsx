import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";

import Overlay from "./Overlay.tsx";
import PaginationFooter from "./paginationFooter.tsx";

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
        value={dataItemsInTableBody}
        stripedRows
        tableStyle={{ maxWidth: "100%", tableLayout: "fixed" }}
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
          style={{ width: "50px" }} // Small width for selection checkbox
        />
        <Column
          field="title"
          header="TITLE"
          style={{ fontWeight: "bold", width: "25%", padding: "8px" }}
          bodyStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
        />
        <Column
          field="place_of_origin"
          header="PLACE OF ORIGIN"
          style={{ width: "15%", padding: "8px" }}
        />
        <Column
          field="artist_display"
          header="ARTIST"
          style={{ width: "220px", padding: "8px" }}
          bodyStyle={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Column
          field="inscriptions"
          header="INSCRIPTIONS"
          body={(row) =>
            typeof row.inscriptions === "string" ? (
              <div
                style={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  padding: "8px",
                }}
              >
                {row.inscriptions}
              </div>
            ) : (
              <div style={{ padding: "8px" }}>N/A</div>
            )
          }
          style={{ width: "20%" }}
        />
        <Column
          field="date_start"
          header="START DATE"
          style={{ width: "10%", padding: "8px", textAlign: "center" }}
        />
        <Column
          field="date_end"
          header="END DATE"
          style={{ width: "10%", padding: "8px", textAlign: "center" }}
        />
      </DataTable>
    </>
  );
}
