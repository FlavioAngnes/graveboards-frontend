'use client'

import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface SearchContextType {
    search: string,
    setSearch: (search: string) => void,
}

export const SearchContext = createContext<SearchContextType>({
    search: "",
    setSearch: ()=>{},
})

export const SearchProvider: FC<{
    children: ReactNode,
}> = ({children}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <SearchContext.Provider value={{
            search: search,
            setSearch: setSearch,
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext);
