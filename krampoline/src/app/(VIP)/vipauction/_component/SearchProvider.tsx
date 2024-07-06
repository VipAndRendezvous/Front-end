"use client";

import React, { createContext, useContext, useState } from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string | null) => void;
  sort: string | null;
  setSort: (sort: string | null) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [sort, setSort] = useState<string>("PROGRESS");

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        sort,
        setSort,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
