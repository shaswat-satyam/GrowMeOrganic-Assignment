import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";

import type { DataItem } from "../types";
import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  selectedItems: DataItem[];
  setSelectedItems: Dispatch<SetStateAction<DataItem[]>>;
  toBeAdded: number;
  setToBeAdded: Dispatch<SetStateAction<number>>;
  body: DataItem[];
}

const ItemsNotSelect = (selectedItems: DataItem[], AllItems: DataItem[]) => {
  const selectedItemSet = new Set(selectedItems.map((item) => item.id));
  return AllItems.filter((item) => !selectedItemSet.has(item.id));
};

export default function Header({
  selectedItems,
  setSelectedItems,
  toBeAdded,
  setToBeAdded,
  body,
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (value == 0) {
                      return;
                    }
                    let ItemsNotSelected = ItemsNotSelect(selectedItems, body);
                    if (value >= ItemsNotSelected.length) {
                      setToBeAdded(toBeAdded + value - ItemsNotSelected.length);
                      setSelectedItems([...selectedItems, ...ItemsNotSelected]);
                    } else {
                      setSelectedItems([
                        ...selectedItems,
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
