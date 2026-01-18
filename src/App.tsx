import { useState, useEffect } from "react";
import Table from "./table.tsx";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const API = (page: number) =>
    `https://api.artic.edu/api/v1/artworks?page=${page}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(API(currentPage));
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const columns = [
    { field: "title", header: "Code" },
    { field: "place_of_origin", header: "Name" },
    { field: "artist_display", header: "Category" },
    { field: "inscriptions", header: "Quantity" },
  ];

  //	<Table data = {products} columns= {columns}/>
  if (isLoading) {
    return <p>Spinner</p>;
  }

  if (error) {
    return <p>Error while fetching data:{error.message}</p>;
  }
  return (
    <>
      <div>{JSON.stringify(products)}</div>
    </>
  );
}

export default App;
