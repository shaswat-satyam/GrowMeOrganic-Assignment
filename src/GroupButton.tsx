import { Button } from "primereact/button";
import type { Dispatch, SetStateAction } from "react";

interface GroupButtonInterface {
  index: number;
  currentPage: number;
  lastPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
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

export default function GroupButton({
  index,
  currentPage,
  lastPage,
  setCurrentPage,
}: GroupButtonInterface) {
  return (
    <Button
      size="small"
      label={getLabel(currentPage, index, lastPage).toString()}
      outlined={isOutlined(currentPage, index, lastPage)}
      onClick={(_) => setCurrentPage(getLabel(currentPage, index, lastPage))}
    />
  );
}
