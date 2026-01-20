import { Button } from "primereact/button";
import type { Dispatch, SetStateAction } from "react";

interface NumberedPaginationButton {
  index: number;
  currentPageNumber: number;
  lastPageNumber: number;
  setCurrentPageNumber: Dispatch<SetStateAction<number>>;
}

const getLabel = (currentPage: number, index: number, lastPage: number) => {
  if ([1, 2, 3].includes(currentPage)) {
    return index;
  }

  if ([lastPage - 3, lastPage - 2, lastPage - 1].includes(currentPage)) {
    return lastPage - 5 + index;
  }

  return currentPage - 3 + index;
};

const isOutlined = (currentPage: number, index: number, lastPage: number) => {
  return getLabel(currentPage, index, lastPage) != currentPage;
};

export default function NumberedPaginationButton({
  index,
  currentPageNumber,
  lastPageNumber,
  setCurrentPageNumber,
}: NumberedPaginationButton) {
  return (
    <Button
      size="small"
      label={getLabel(currentPageNumber, index, lastPageNumber).toString()}
      outlined={isOutlined(currentPageNumber, index, lastPageNumber)}
      onClick={(_) =>
        setCurrentPageNumber(getLabel(currentPageNumber, index, lastPageNumber))
      }
    />
  );
}
