import "./App.css";
import "primeicons/primeicons.css";

import { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

import Table from "./table.tsx";

import type { DataItem, Root } from "../types.ts";

function App() {
  const [data, setData] = useState<Root>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [error, setError] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(true);

  const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
  const [toBeAdded, setToBeAdded] = useState<number>(0);

  const API = (page: number) =>
    `https://api.artic.edu/api/v1/artworks?page=${page}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(API(currentPage));
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  if (isLoading || typeof data == "undefined") {
    return <ProgressSpinner style={{ width: "100vw", height: "100vh" }} />;
  }

  if (error) {
    return <p>Error while fetching data</p>;
  }

  return (
    <>
      <div>
        Selected: <b>{selectedItems.length + toBeAdded}</b> rows
      </div>
      <Table
        body={data.data}
        footer={data.pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        toBeAdded={toBeAdded}
        setToBeAdded={setToBeAdded}
      />
    </>
  );
}

export default App;
