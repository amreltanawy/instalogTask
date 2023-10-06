import TableRow from "./TableRow";
import TableRowCM, { EventInterface}from "~/componentsModel/TableRowCM"

let sampleData : EventInterface[] = [{
    id: "evt_15B56WILKW5K1",
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
    id: "evt_15B56WILKW5K2",
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
    id: "evt_15B56WILKW5K3",
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

export default (props: {tableRowDataArray: EventInterface[]}) => {
    let {tableRowDataArray} = props;

    tableRowDataArray = sampleData;

    return (
        <>
        <table className="min-w-full divide-y divide-neutral-200">
      <thead className="bg-neutral-100 text-md text-zinc-600">
        <tr>
          <th scope="col" className="w-1/3 px-4 py-3 text-left">
            <span className="font-bold">ACTOR</span>
          </th>
          <th scope="col" className="w-1/3 px-4 py-3 text-left">
            <span className="font-bold">ACTION</span>
          </th>
          <th scope="col" className="w-1/3 px-4 py-3 text-left">
            <span className="font-bold">DATE</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {
            tableRowDataArray.map(dataRow=>  {
                let tableRowCM  = new TableRowCM(dataRow)
                return <TableRow key={dataRow.id} tableRowCM={tableRowCM} />
            })
        }
      </tbody>
    </table>
        </>
    )
}