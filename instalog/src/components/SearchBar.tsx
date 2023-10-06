import React, { useState } from "react";


export default (props: {onSearch: (query: string) => void }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncerGate, setDebouncerGate] = useState(true);
    const debounceDelay = 3000; // Adjust the delay as needed
    // let debouncerGate: boolean = true;

    let {onSearch} = props;
    const handleSearchChange = (event:Event) => {
    const query = event.target?.value as string;
    setSearchQuery(query);
  
    if(debouncerGate){
       setDebouncerGate(false);
       onSearch(query); // Call the onSearch callback with the query
       setTimeout(()=> {setDebouncerGate(true)}, debounceDelay)
    }
  };


    return (
        <>
            <div className="pt-4 px-4 bg-neutral-100 rounded-t-2xl rounded-b-none">
                <div className="flex justify-start items-center h-11 rounded-lg border border-neutral-200">
                    <input
                        type="text"
                        placeholder="Search name, email, or action..."
                        className="w-full px-3 py-1 outline-none bg-transparent text-white text-sm font-normal font-['Inter']"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
        </>
    )
}