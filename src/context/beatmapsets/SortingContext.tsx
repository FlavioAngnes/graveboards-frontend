"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";
import {
    Sorting,
    SortingValue,
    BeatmapsetSortingValues
} from "@/types/beatmapsets/sorting";
import { Order } from "@/types/sorting";

interface SortingContextType {
    layers: Sorting[];
    activeLayers: Sorting[];
    nextLayer: SortingValue | undefined;
    addLayer: () => void;
    removeLayer: (value: SortingValue) => void;
    updateLayerOrder: (value: SortingValue, order: Order) => void;
    updateLayerValue: (value: SortingValue, newValue: SortingValue) => void;
    canClear: boolean;
    clearLayers: () => void;
    canApply: boolean;
    applyLayers: () => void;
    undoLayers: () => void;
    reorderLayers: (newLayers: SortingValue[]) => void;
}

export const SortingContext = createContext<SortingContextType>({
    layers: [],
    activeLayers: [],
    nextLayer: "Profile.country_code",
    addLayer: () => {
    },
    removeLayer: () => {
    },
    updateLayerOrder: () => {
    },
    updateLayerValue: () => {
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
});

export const SortingProvider: FC<{
    children: ReactNode,
    defaultSortingLayers?: Required<Sorting>[]
}> = ({ children, defaultSortingLayers }) => {
    const [layers, setLayers] = useState<Sorting[]>(defaultSortingLayers || []);
    const [appliedLayers, setAppliedLayers] = useState<Sorting[]>(layers);

    const canClear = layers.length > 0;
    const canApply = JSON.stringify(layers.filter(l => !l.isDefault)) !== JSON.stringify(appliedLayers.filter(l => !l.isDefault));

    const nextLayer = BeatmapsetSortingValues.find(
        option => !layers.some(sorting => sorting.value === option)
    );

    const addLayer = () => {
        if (nextLayer) {
            setLayers([...layers, {
                value: nextLayer,
                order: "asc"
            }]);
        }
    };

    const removeLayer = (value: SortingValue) => {
        setLayers(layers.filter(layer => layer.value !== value));
    };

    const updateLayerOrder = (value: SortingValue, order: Order) => {
        setLayers(layers.map(layer => layer.value === value ? {
            ...layer,
            order
        } : layer));
    };

    const updateLayerValue = (value: SortingValue, newValue: SortingValue) => {
        setLayers(layers.map(layer => layer.value === value ? {
            ...layer,
            value: newValue
        } : layer));
    }

    const clearLayers = () => setLayers([]);

    const applyLayers = () => setAppliedLayers(layers);

    const undoLayers = () => setLayers(appliedLayers);

    const reorderLayers = (items: SortingValue[]) => {
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
        });
    };

    return (
        <SortingContext.Provider value={{
            layers,
            activeLayers: appliedLayers,
            nextLayer,
            addLayer,
            removeLayer,
            updateLayerOrder,
            updateLayerValue,
            canClear,
            clearLayers,
            canApply,
            applyLayers,
            undoLayers,
            reorderLayers
        }}>
            {children}
        </SortingContext.Provider>
    );
};

export const useSorting = () => useContext(SortingContext);
