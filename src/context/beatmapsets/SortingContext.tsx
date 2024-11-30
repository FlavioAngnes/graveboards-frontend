'use client'

import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {SortingLayerMap, SortingLayerOptions, SortingLayerValue} from "@/types/beatmapsets/Sorting";

interface SortingContextType {
    layers: SortingLayerOptions[];
    layersToUse: SortingLayerOptions[];
    nextLayer: SortingLayerValue;
    addLayer: () => void;
    removeLayer: (index: number) => void;
    updateLayer: (layer: SortingLayerOptions, index: number) => void;
    canClear: boolean;
    clearLayers: () => void;
    canApply: boolean;
    applyLayers: () => void;
    undoLayers: () => void;
    reorderLayers: (newLayers: SortingLayerValue[]) => void;
}

export const SortingContext = createContext<SortingContextType>({
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

export const SortingProvider: FC<{
    children: ReactNode,
    defaultSortingLayers?: Required<SortingLayerOptions>[]
}> = ({children, defaultSortingLayers}) => {
    const [layers, setLayers] = useState<SortingLayerOptions[]>([]);
    const [layersToUse, setLayersToUse] = useState<SortingLayerOptions[]>(defaultSortingLayers || []);

    const canClear = layers.length > 0;
    const canApply = JSON.stringify(layers) !== JSON.stringify(layersToUse.filter(layer => !layer.isDefault));

    const nextLayer = Object.keys(SortingLayerMap).find(option => !layers.some(sorting => sorting.value === option)) as SortingLayerValue;

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

    const updateLayer = (layer: SortingLayerOptions, index: number) => {
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
        setLayers(layersToUse);
    }

    const reorderLayers = (items: SortingLayerValue[]) => {
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
        </SortingContext.Provider>
    )
}

export const useSorting = () => useContext(SortingContext);
