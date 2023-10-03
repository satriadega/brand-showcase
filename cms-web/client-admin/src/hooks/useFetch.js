import { useEffect, useState } from "react";

function useFetch(url = "") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw await response.text();
      }

      const responseJSON = await response.json();
      // if (!response.ok) {
      //   throw responseJSON; // Jika ada error message di dalam body JSONnya maka gunakan ini
      // }
      setData(responseJSON);
    } catch (error) {
      console.log(error, "<<< error");
    } finally {
      setLoading(false);
    }
  };

  // return [data, loading]
  return {
    data,
    loading,
    fetchData,
  };
}

export default useFetch;
