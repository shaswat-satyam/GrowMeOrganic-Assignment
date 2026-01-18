import { Button } from "primereact/button";
import type { Pagination } from "../types.ts";

import type { Dispatch, SetStateAction } from "react";
interface footerProps {
  footer: Pagination;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

let dataToFooter = (start: number, end: number, total: number) =>
  `Showing ${start} to ${end} of ${total} entries`;

export default function Footer({
  footer,
  currentPage,
  setCurrentPage,
}: footerProps) {
  return (
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
          label={currentPage.toString()}
        />
        <Button
          size="small"
          outlined={currentPage + 1 != currentPage}
          label={(currentPage + 1).toString()}
        />
        <Button
          size="small"
          outlined={currentPage + 1 != currentPage}
          label={(currentPage + 2).toString()}
          onClick={(_) => setCurrentPage(currentPage + 2)}
        />
        <Button
          size="small"
          outlined={currentPage + 3 != currentPage}
          label={(currentPage + 3).toString()}
          onClick={(_) => setCurrentPage(currentPage + 3)}
        />
        <Button
          size="small"
          outlined={currentPage + 3 != currentPage}
          label={(currentPage + 4).toString()}
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
  );
}
