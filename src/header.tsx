import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";

import type { DataItem } from "../types";
import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  selectedItemsIds: number[];
  setSelectedItemsIds: Dispatch<SetStateAction<number[]>>;
  setNumberOfItemsYetToBeAdded: Dispatch<SetStateAction<number>>;
  numberOfItemsYetToBeAdded: number;
  dataItemsInTableBody: DataItem[];
}

const ItemsNotSelect = (selectedItems: number[], AllItems: DataItem[]) => {
  const selectedItemSet = new Set(selectedItems);
  return AllItems.filter((item) => !selectedItemSet.has(item.id)).map(
    (item) => item.id,
  );
};

export default function Overlay({
  selectedItemsIds,
  setSelectedItemsIds,
  numberOfItemsYetToBeAdded,
  setNumberOfItemsYetToBeAdded,
  dataItemsInTableBody,
}: HeaderProps) {
  const overlayRef = useRef<OverlayPanel | null>(null);
  const [value, setValue] = useState(0);
  return (
    <div>
      <span>
        <i
          onClick={(e) => overlayRef.current?.toggle(e)}
          className="pi pi-angle-down"
        />
        <OverlayPanel ref={overlayRef}>
          <div>
            <h4>Select Multiple Rows</h4>
            <p>Enter number of rows to select across all pages</p>
            <div>
              <form>
                <InputText
                  name="ToBeSelected"
                  type="number"
                  placeholder="e.g 20"
                  onChange={(e) => setValue(parseInt(e.target.value))}
                />
                <Button
                  disabled={value < 0}
                  onClick={(e) => {
                    e.preventDefault();
                    if (value == 0) {
                      return;
                    }
                    let ItemsNotSelected = ItemsNotSelect(
                      selectedItemsIds,
                      dataItemsInTableBody,
                    );
                    if (value >= ItemsNotSelected.length) {
                      setNumberOfItemsYetToBeAdded(
                        numberOfItemsYetToBeAdded +
                          value -
                          ItemsNotSelected.length,
                      );
                      setSelectedItemsIds([
                        ...selectedItemsIds,
                        ...ItemsNotSelected,
                      ]);
                    } else {
                      setNumberOfItemsYetToBeAdded(
                        numberOfItemsYetToBeAdded +
                          value -
                          ItemsNotSelected.slice(0, value).length,
                      );
                      setSelectedItemsIds([
                        ...selectedItemsIds,
                        ...ItemsNotSelected.slice(0, value),
                      ]);
                    }
                    setValue(0);
                    overlayRef.current?.toggle(e);
                  }}
                >
                  Select
                </Button>
              </form>
            </div>
          </div>
        </OverlayPanel>
      </span>
    </div>
  );
}
