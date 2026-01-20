import "./App.css";
import "primeicons/primeicons.css";

import { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

import Table from "./table.tsx";

import type { Cache, Root, SelectedId } from "../types.ts";

function App() {
  // State to manage the Current Page Data from API
  const [data, setData] = useState<Root>();
  // State to handle the current Page.
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  // State to handle loading or error for the data fetching
  const [error, setError] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(true);

  // State to handle selected Items and toBeAdded items.
  const [selectedItemsIds, setSelectedItemsIds] = useState<SelectedId[]>([]);
  const [numberOfItemsYetToBeAdded, setNumberOfItemsYetToBeAdded] =
    useState<number>(0);

  const API = (page: number) =>
    `https://api.artic.edu/api/v1/artworks?page=${page}`;

  // To fetch data for every page change.
  const [cache, setCache] = useState<Cache>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (Object.hasOwn(cache, currentPageNumber)) {
          setData(cache[currentPageNumber]);
        } else {
          const res = await fetch(API(currentPageNumber));
          if (!res.ok) throw new Error("Request failed");
          const data = await res.json();
          setCache((prevCache) => ({
            ...prevCache,
            [currentPageNumber]: data,
          }));
          setData(data);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPageNumber]);

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
        Selected: <b>{selectedItemsIds.length + numberOfItemsYetToBeAdded}</b>{" "}
        rows
      </div>
      <Table
        dataItemsInTableBody={data.data}
        PaginationData={data.pagination}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        selectedItemsIds={selectedItemsIds}
        setSelectedItemsIds={setSelectedItemsIds}
        numberOfItemsYetToBeAdded={numberOfItemsYetToBeAdded}
        setNumberOfItemsYetToBeAdded={setNumberOfItemsYetToBeAdded}
      />
    </>
  );
}

export default App;
