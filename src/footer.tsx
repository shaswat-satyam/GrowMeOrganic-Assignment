import { Button } from "primereact/button";
import GroupButton from "./GroupButton.tsx";

import type { Pagination } from "../types.ts";

import type { Dispatch, SetStateAction } from "react";
interface footerProps {
  footer: Pagination;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function Footer({
  footer,
  currentPage,
  setCurrentPage,
}: footerProps) {
  return (
    <div style={{ display: "flex", justifyContent: "Space-between" }}>
      <p>
        Showing <b>{footer.offset}</b> to{" "}
        <b>{footer.limit * footer.current_page}</b> of <b>{footer.total}</b>{" "}
        entries
      </p>
      <div>
        <Button
          size="small"
          outlined={true}
          label="Previous"
          disabled={currentPage == 1}
          onClick={(_) => setCurrentPage(currentPage - 1)}
        />
        <>
          <GroupButton
            index={1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={footer.total_pages}
          />
          <GroupButton
            index={2}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={footer.total_pages}
          />
          <GroupButton
            index={3}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={footer.total_pages}
          />
          <GroupButton
            index={4}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={footer.total_pages}
          />
          <GroupButton
            index={5}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={footer.total_pages}
          />
        </>
        <Button
          size="small"
          outlined={true}
          label="Next"
          disabled={currentPage == footer.total_pages}
          onClick={(_) => setCurrentPage(currentPage + 1)}
        />
      </div>
    </div>
  );
}
