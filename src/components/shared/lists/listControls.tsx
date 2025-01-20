import React, {FC} from 'react';
import Grouping from "@/components/beatmapsets/controls/grouping";
import {ViewSwitch} from "@/components/beatmapsets/controls/viewSwitch";
import Search from "@/components/beatmapsets/controls/search";
import FiltersList from "@/components/beatmapsets/controls/filters/filtersList";
import SortingLayerList from "@/components/beatmapsets/controls/sortingLayers/sortingLayerList";

interface ListControlsProps {
    showControls?: boolean;
    showGrouping?: boolean;
    showViewSwitch?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
    showSorting?: boolean;
    id: string;
    view: "list" | "grid";
    setView: (value: (((prevState: ("list" | "grid")) => ("list" | "grid")) | "list" | "grid")) => void;
    grouping: "artist" | "mapper" | null;
    setGrouping: (value: (((prevState: ("artist" | "mapper" | null)) => ("artist" | "mapper" | null)) | "artist" | "mapper" | null)) => void;
}

const ListControls: FC<ListControlsProps> = ({
                                                 showControls = true,
                                                 showGrouping = true,
                                                 showViewSwitch = true,
                                                 showSearch = true,
                                                 showSorting = true,
                                                 showFilters = true,
                                                 id,
                                                 grouping,
                                                 setGrouping,
                                                 view,
                                                 setView,
                                             }) => {
    if (!showControls) return null;

    return (
        <div className="flex flex-row items-center justify-center self-end gap-4 max-w-full">
            {
                showGrouping && (
                    <>
                        <Grouping grouping={grouping} setGrouping={setGrouping}/>
                        <ListControlsDivider/>
                    </>

                )
            }

            {
                showViewSwitch && (
                    <>
                        <ViewSwitch view={view} setView={setView}/>
                        <ListControlsDivider/>
                    </>
                )
            }

            <div className="flex gap-2 relative">
                {
                    showSearch && (
                        <Search listId={id}/>
                    )
                }

                {
                    showFilters && (
                        <FiltersList/>
                    )
                }

                {
                    showSorting && (
                        <SortingLayerList/>
                    )
                }
            </div>
        </div>
    );
};

export default ListControls;

export const ListControlsDivider = () => {
    return (
        <div className="block h-6 w-[1px] bg-tertiary-200 dark:bg-tertiary-700"></div>
    );
}
