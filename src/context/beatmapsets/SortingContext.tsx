'use client'

import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {BeatmapsetListSortingLayer, BeatmapsetListSortingLayerValue} from "@/types/beatmapsets/sorting";
import {BeatmapsetListSortingLayerMap} from "@/data/beatmapsets/sorting";

interface SortingContextType {
    layers: BeatmapsetListSortingLayer[];
    currentLayers: BeatmapsetListSortingLayer[];
    nextLayer: BeatmapsetListSortingLayerValue;
    addLayer: () => void;
    removeLayer: (index: number) => void;
    updateLayer: (layer: BeatmapsetListSortingLayer, index: number) => void;
    canClear: boolean;
    clearLayers: () => void;
    canApply: boolean;
    applyLayers: () => void;
    undoLayers: () => void;
    reorderLayers: (newLayers: BeatmapsetListSortingLayerValue[]) => void;
}

export const SortingContext = createContext<SortingContextType>({
    layers: [],
    currentLayers: [],
    nextLayer: 'Profile.country_code',
    addLayer: () => {
    },
    removeLayer: () => {
    },
    updateLayer: () => {
    },
    canClear: false,
    clearLayers: () => {
    },
    canApply: false,
    applyLayers: () => {
    },
    undoLayers: () => {
    },
    reorderLayers: () => {
    }
})

export const SortingProvider: FC<{
    children: ReactNode,
    defaultSortingLayers?: Required<BeatmapsetListSortingLayer>[]
}> = ({children, defaultSortingLayers}) => {
    const [layers, setLayers] = useState<BeatmapsetListSortingLayer[]>([]);
    const [currentLayers, setCurrentLayers] = useState<BeatmapsetListSortingLayer[]>(defaultSortingLayers || []);

    const canClear = layers.length > 0;
    const canApply = JSON.stringify(layers) !== JSON.stringify(currentLayers.filter(layer => !layer.isDefault));

    const nextLayer = Object.keys(BeatmapsetListSortingLayerMap).find(option => !layers.some(sorting => sorting.value === option)) as BeatmapsetListSortingLayerValue;

    const addLayer = () => {
        if (nextLayer) {
            setLayers((prev) => [...prev, {
                value: nextLayer,
                order: 'asc'
            }]);
        }
    }

    const removeLayer = (index: number) => {
        setLayers((prev) => prev.filter((_, i) => i !== index));
    }

    const updateLayer = (layer: BeatmapsetListSortingLayer, index: number) => {
        setLayers((prev) => {
            const newLayers = [...prev];
            newLayers[index] = layer;
            return newLayers;
        });
    }

    const clearLayers = () => {
        setLayers([]);
    }

    const applyLayers = () => {
        const defaultLayers = currentLayers.filter(layer => layer.isDefault);
        setCurrentLayers([...layers, ...defaultLayers]);
    }

    const undoLayers = () => {
        setLayers(currentLayers.filter(layer => !layer.isDefault));
    }

    const reorderLayers = (items: BeatmapsetListSortingLayerValue[]) => {
        setLayers((prev) => {
            const newLayers = [...prev];

            items.forEach((item, index) => {
                const layer = newLayers.find(layer => layer.value === item);
                if (layer) {
                    newLayers.splice(newLayers.indexOf(layer), 1);
                    newLayers.splice(index, 0, layer);
                }
            });

            return newLayers;
        })
    }

    return (
        <SortingContext.Provider value={{
            layers,
            currentLayers,
            nextLayer,
            addLayer,
            removeLayer,
            updateLayer,
            canClear,
            clearLayers,
            canApply,
            applyLayers,
            undoLayers,
            reorderLayers
        }}>
            {children}
        </SortingContext.Provider>
    )
}

export const useSorting = () => useContext(SortingContext);
