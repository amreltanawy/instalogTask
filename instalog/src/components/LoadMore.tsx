import React, {useState} from "react";

export default ({onClick}: {onClick:() => void}) => {

    const debounceDelay = 1000; // Adjust the delay as needed
    const [debouncerGate, setDebouncerGate] = useState(true);
    const handleLoadMore = () =>{
        if(debouncerGate){
            setDebouncerGate(false);
            onClick();
            setTimeout(()=>{
                setDebouncerGate(true);
            }, debounceDelay)
        }
    }
    
    return (
        <>
            <div onClick={handleLoadMore} className="loadMore flex justify-center rounded-b-2xl items-center py-2 bg-neutral-100">
                <div className="loadMore text-zinc-600 text-sm font-normal font-['Inter'] uppercase">LOAD MORE</div>
            </div>
        </>
    )
}