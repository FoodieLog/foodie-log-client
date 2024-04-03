import { useCallback } from "react";

function useLocalStorage() {
  const setItem = useCallback((key: string, value: string) => {
    if (typeof window !== "undefined") {
      return localStorage.setItem(key, value);
    }
  }, []);

  const getItem = useCallback((key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  }, []);

  const removeItem = useCallback((key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.removeItem(key);
    }
  }, []);

  return { setItem, getItem, removeItem };
}

export default useLocalStorage;
