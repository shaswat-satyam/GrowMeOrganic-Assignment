import { Button } from "primereact/button";
import GroupButton from "./GroupButton.tsx";

import type { Pagination } from "../types.ts";
import type { Dispatch, SetStateAction } from "react";

interface footerProps {
  paginationData: Pagination;
  currentPageNumber: number;
  setCurrentPageNumber: Dispatch<SetStateAction<number>>;
}

export default function PaginationFooter({
  paginationData,
  currentPageNumber,
  setCurrentPageNumber,
}: footerProps) {
  return (
    <div style={{ display: "flex", justifyContent: "Space-between" }}>
      <p>
        Showing <b>{paginationData.offset + 1}</b> to{" "}
        <b>{paginationData.limit * paginationData.current_page}</b> of{" "}
        <b>{paginationData.total}</b> entries
      </p>
      <div>
        <Button
          size="small"
          outlined={true}
          label="Previous"
          disabled={currentPageNumber == 1}
          onClick={(_) => setCurrentPageNumber(currentPageNumber - 1)}
        />
        <>
          <GroupButton
            index={1}
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            lastPageNumber={paginationData.total_pages}
          />
          <GroupButton
            index={2}
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            lastPageNumber={paginationData.total_pages}
          />
          <GroupButton
            index={3}
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            lastPageNumber={paginationData.total_pages}
          />
          <GroupButton
            index={4}
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            lastPageNumber={paginationData.total_pages}
          />
          <GroupButton
            index={5}
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            lastPageNumber={paginationData.total_pages}
          />
        </>
        <Button
          size="small"
          outlined={true}
          label="Next"
          disabled={currentPageNumber == paginationData.total_pages}
          onClick={(_) => setCurrentPageNumber(currentPageNumber + 1)}
        />
      </div>
    </div>
  );
}
