'use client';

import React, {createContext, FC, useContext, useState} from "react";

interface BeatmapPreviewContextType {
    src: string | null;
    setSrc: (src: string | null) => void;
}

export const BeatmapPreviewContext = createContext<BeatmapPreviewContextType>({
    src: null,
    setSrc: () => {},
});

export const BeatmapPreviewProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const [src, setSrc] = useState<string | null>(null);

    return (
        <BeatmapPreviewContext.Provider value={{
            src,
            setSrc,
        }}>
            {children}
        </BeatmapPreviewContext.Provider>
    );
};

export const useBeatmapPreview = () => useContext(BeatmapPreviewContext);
