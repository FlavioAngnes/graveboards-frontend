import React, {FC} from 'react';
import {MdClose, MdSearch} from "react-icons/md";
import {useSearch} from "@/context/beatmapsets/BeatmapsetListSearchContext";

interface SearchProps {
    listId: string;
}

const Search: FC<SearchProps> = ({listId}) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

    const {search, setSearch} = useSearch();

    return (
        <div
            className={`${search.length > 0 ? 'border-primary-500' : 'border-transparent'} ${open ? 'bg-tertiary-100 dark:bg-tertiary-900' : ''} flex border-2 items-center rounded-lg transition-all duration-300 ease-in-out`}>
            <button onClick={() => {
                setOpen(!open)
                if (!open) {
                    const input = document.getElementById(`${listId}-search`);
                    if (input) {
                        input.focus();
                    }
                }
            }}
                    className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center justify-center transition-all duration-300 ease-in-out box-border border-2 border-transparent
                            ${search.length > 0 ? `text-primary-500` : `text-tertiary-500 hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                <MdSearch className="size-5"/>
            </button>
            <input
                id={`${listId}-search`}
                className={`bg-transparent outline-none ring-none ${open ? 'opacity-100 max-[400px]:w-24 max-w-32 sm:max-w-40' : 'opacity-0 max-w-0'} transition-all duration-300 ease-in-out`}
                type="text"
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setValue(newValue);

                    if (debounceTimeout.current) {
                        clearTimeout(debounceTimeout.current);
                    }

                    debounceTimeout.current = setTimeout(() => {
                        setSearch(newValue);
                    }, 300);
                }}
            />
            <button onClick={() => {
                setValue('');
                setSearch('');
            }} disabled={search.length === 0}
                    className={`rounded-lg enabled:hover:bg-tertiary-100 enabled:active:bg-tertiary-200 enabled:hover:dark:bg-tertiary-900 enabled:active:dark:bg-tertiary-800 flex items-center justify-center transition-all duration-300 ease-in-out
                                ${open ? 'p-1 w-6' : 'p-0 w-0'}
                                ${search.length > 0 ? `text-primary-500 opacity-100` : `opacity-0 hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                <MdClose className="size-5"/>
            </button>
        </div>
    );
};

export default Search;
