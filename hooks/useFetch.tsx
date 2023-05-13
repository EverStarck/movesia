import { useEffect, useState } from "react";
import axios from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface UseFetchProps {
  endpoint: string;
  query?: Record<string, string>;
  body?: Record<string, string>;
  method?: Method;
}

const useFetch = ({ endpoint, query, body, method = "GET" }: UseFetchProps) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    params: { ...query },
    body,
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
