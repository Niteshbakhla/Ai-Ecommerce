import { createContext, useContext, useState } from "react";

type SearchContextType = {
            search: string;
            setSearch: (value: string) => void;
};

const SearchContext = createContext < SearchContextType | null > (null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
            const [search, setSearch] = useState("");
            return (
                        <SearchContext.Provider value={{ search, setSearch }}>
                                    {children}
                        </SearchContext.Provider>
            );
};

export const useSearch = () => {
            const ctx = useContext(SearchContext);
            if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
            return ctx;
};
