'use client'

import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {BeatmapsetListSortingLayerOptions, BeatmapsetListSortingLayerValue} from "@/types/beatmapsets/sorting";
import {BeatmapsetListSortingLayerMap} from "@/data/beatmapsets/sorting";

interface BeatmapsetListSortingContextType {
    layers: BeatmapsetListSortingLayerOptions[];
    layersToUse: BeatmapsetListSortingLayerOptions[];
    nextLayer: BeatmapsetListSortingLayerValue;
    addLayer: () => void;
    removeLayer: (index: number) => void;
    updateLayer: (layer: BeatmapsetListSortingLayerOptions, index: number) => void;
    canClear: boolean;
    clearLayers: () => void;
    canApply: boolean;
    applyLayers: () => void;
    undoLayers: () => void;
    reorderLayers: (newLayers: BeatmapsetListSortingLayerValue[]) => void;
}

export const BeatmapsetListSortingContext = createContext<BeatmapsetListSortingContextType>({
    layers: [],
    layersToUse: [],
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

export const BeatmapsetListSortingProvider: FC<{
    children: ReactNode,
    defaultSortingLayers?: Required<BeatmapsetListSortingLayerOptions>[]
}> = ({children, defaultSortingLayers}) => {
    const [layers, setLayers] = useState<BeatmapsetListSortingLayerOptions[]>([]);
    const [layersToUse, setLayersToUse] = useState<BeatmapsetListSortingLayerOptions[]>(defaultSortingLayers || []);

    const canClear = layers.length > 0;
    const canApply = JSON.stringify(layers) !== JSON.stringify(layersToUse.filter(layer => !layer.isDefault));

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

    const updateLayer = (layer: BeatmapsetListSortingLayerOptions, index: number) => {
        console.log(layer, index);
        console.log(layers)
        setLayers((prev) => prev.map((prevLayer, i) => i === index ? layer : prevLayer));
    }

    const clearLayers = () => {
        setLayers([]);
    }

    const applyLayers = () => {
        const defaultLayers = layersToUse.filter(layer => layer.isDefault);
        const updatedLayersToUse = [...defaultLayers, ...layers];
        setLayersToUse(updatedLayersToUse);
    }

    const undoLayers = () => {
        setLayers(layersToUse.filter(layer => !layer.isDefault));
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
        <BeatmapsetListSortingContext.Provider value={{
            layers,
            layersToUse,
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
        </BeatmapsetListSortingContext.Provider>
    )
}

export const useSorting = () => useContext(BeatmapsetListSortingContext);
