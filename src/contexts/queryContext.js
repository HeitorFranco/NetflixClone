import React, { createContext, useState } from "react";

export const QueryContext = createContext();

export default function QueryProvider({ children }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  return (
    <QueryContext.Provider value={{ query, setQuery, movies, setMovies }}>
      {children}
    </QueryContext.Provider>
  );
}
