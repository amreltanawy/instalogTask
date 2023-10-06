import { useEffect, useState } from "react";
import LoadMore from "~/components/LoadMore";
import SearchBar from "~/components/SearchBar";
import Table from "~/components/Table";

const PAGE_SIZE = 10;

let sampleData : EventInterface[] = [{
  id: "evt_15B56WILKW5K",
  object: "event",
  actor_id: "user_3VG74289PUA2",
  actor_name: "Ali Salah",
  actor_email: "ali@instatus.com",
  group: "instatus.com",
  action: {
    id: "evt_action_PGTD81NCAOQ2",
    object: "event_action",
    name: "user.login_succeeded"
  },
  target_id: "user_DOKVD1U3L030",
  target_name: "ali@instatus.com",
  location: "105.40.62.95",
  occurred_at: new Date("2022-01-05T14:31:13.607Z"),
  metadata: {
    redirect: "/setup",
    description: "User login succeeded.",
    x_request_id: "req_W1Y13QOHMI5H"
  },
},{
  id: "evt_15B56WILKW5K",
  object: "event",
  actor_id: "user_3VG74289PUA2",
  actor_name: "Ali Salah",
  actor_email: "ali@instatus.com",
  group: "instatus.com",
  action: {
    id: "evt_action_PGTD81NCAOQ2",
    object: "event_action",
    name: "user.login_succeeded"
  },
  target_id: "user_DOKVD1U3L030",
  target_name: "ali@instatus.com",
  location: "105.40.62.95",
  occurred_at: new Date("2022-01-05T14:31:13.607Z"),
  metadata: {
    redirect: "/setup",
    description: "User login succeeded.",
    x_request_id: "req_W1Y13QOHMI5H"
  },
},{
  id: "evt_15B56WILKW5K",
  object: "event",
  actor_id: "user_3VG74289PUA2",
  actor_name: "Ali Salah",
  actor_email: "ali@instatus.com",
  group: "instatus.com",
  action: {
    id: "evt_action_PGTD81NCAOQ2",
    object: "event_action",
    name: "user.login_succeeded"
  },
  target_id: "user_DOKVD1U3L030",
  target_name: "ali@instatus.com",
  location: "105.40.62.95",
  occurred_at: new Date("2022-01-05T14:31:13.607Z"),
  metadata: {
    redirect: "/setup",
    description: "User login succeeded.",
    x_request_id: "req_W1Y13QOHMI5H"
  },
}

]

export default function Home() {


  const [sampleData, setSampleData] = useState<EventInterface[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [debouncerGate, setDebouncerGate] = useState(false)
  const debounceDelay = 100; // Adjust the delay as needed
 
  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchData(currentPage, filterQuery);
  }, [currentPage, filterQuery]);

  const fetchData = (page : number, query: string | undefined = undefined) => {

    if(!debouncerGate){
      return
      
  }
  setDebouncerGate(false)

  
    setTimeout(()=>{
        setDebouncerGate(true);
    }, debounceDelay);


    let fetchString = `/api/events?page=${page}&pageSize=${PAGE_SIZE}`;
    if (query != undefined && query.length > 0) {
        fetchString += `&search=${query}`
    }
    // Replace this with your API endpoint and pagination logic
    fetch(fetchString)
      .then((response) => response.json())
      .then((data) => {
        // Append new data to the existing sampleData
        console.log("Tanawy is testing", data);
        setSampleData((prevData) => [...prevData, ...data]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  

  const handleSearch = (query: string) => {
    debounceGate = true;
    setCurrentPage(0);
    setFilterQuery(query);
  };

  const handleLoadMore = () => {
    debounceGate = true;
    // Increment the current page and fetch more data
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="screen1 container py-8 flex justify-center items-center flex-col">
  <div className="w-3/4 h-3/4 min-w-[815px] flex flex-col min-w-max shadow border border-zinc-100 rounded-2xl">
    <SearchBar onSearch={handleSearch} />
    <Table tableRowDataArray={sampleData} />
    <LoadMore onClick={handleLoadMore} />
  </div>
</div>
    </>
  );
}
