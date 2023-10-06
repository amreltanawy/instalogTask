import React, { useState } from 'react';
import TableRowCM, { EventInterface}from "~/componentsModel/TableRowCM"
import RowDetails from "./RowDetails";

let sampleData: EventInterface = {
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


export default (props:{tableRowCM: TableRowCM}) => {

    const data: EventInterface = sampleData;
    const {tableRowCM} = props; 

    const [detailedView, setDetailedView] = useState(tableRowCM.detailedView);

    const toggleDetailView = () => {
      tableRowCM.detailedView = !detailedView;
      setDetailedView(!detailedView);
    };

    return (
        <>
        <tr onClick={toggleDetailView}>
          <td className="w-1/3 px-4 py-3 flex items-center">
            <span className="bg-gradient-to-br from-orange-400 to-fuchsia-600 rounded-full flex justify-center items-center text-white text-sm font-bold py-px px-1.5">{data.actor_name.toUpperCase()[0]}</span>
            <span className="ml-3 text-sm">{data.actor_email}</span>
          </td>
          <td className="w-1/3 px-4 py-2 text-sm">
            {data.action.name}
          </td>
          <td className="w-1/3 px-4 py-2 text-sm">{data.occurred_at.toISOString()}</td>
        </tr>
        {detailedView? <RowDetails tableRowCM={tableRowCM} />: <></>}
        </>
    )
}