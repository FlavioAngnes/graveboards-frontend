'use client'

import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface BeatmapsetListSearchContextType {
    search: string,
    setSearch: (search: string) => void,
}

export const BeatmapsetListSearchContext = createContext<BeatmapsetListSearchContextType>({
    search: "",
    setSearch: ()=>{},
})

export const BeatmapsetListSearchProvider: FC<{
    children: ReactNode,
}> = ({children}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <BeatmapsetListSearchContext.Provider value={{
            search: search,
            setSearch: setSearch,
        }}>
            {children}
        </BeatmapsetListSearchContext.Provider>
    )
}

export const useSearch = () => useContext(BeatmapsetListSearchContext);
