"use client";

import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

function useFetchData<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await api.get(url);
        setData(response.data);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;
