import { useState, useEffect } from "react";
import Table from "./table.tsx";
import { ProgressSpinner } from "primereact/progressspinner";

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [error, setError] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(true);

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

  if (isLoading) {
    return <ProgressSpinner style={{ width: "100vw", height: "100vh" }} />;
  }

  if (error) {
    return <p>Error while fetching data</p>;
  }
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <Table
        body={data.data}
        footer={data.pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default App;
