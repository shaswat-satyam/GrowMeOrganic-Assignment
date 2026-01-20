import "./App.css";
import "primeicons/primeicons.css";

import { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

import Table from "./table.tsx";

import type { DataItem, Root } from "../types.ts";

function App() {
  // State to manage the Current Page Data from API
  const [data, setData] = useState<Root>();
  // State to handle the current Page.
  const [currentPage, setCurrentPage] = useState<number>(1);

  // State to handle loading or error for the data fetching
  const [error, setError] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(true);

  // State to handle selected Items and toBeAdded items.
  const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
  const [toBeAdded, setToBeAdded] = useState<number>(0);

  const API = (page: number) =>
    `https://api.artic.edu/api/v1/artworks?page=${page}`;

  // To fetch data for every page change.
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

  // To show a spinner when data is loading or data is undefined
  if (isLoading || typeof data == "undefined") {
    return <ProgressSpinner style={{ width: "100vw", height: "100vh" }} />;
  }

  // To show Error if any
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
