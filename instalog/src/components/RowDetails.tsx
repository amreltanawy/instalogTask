import TableRowCM, { EventInterface}from "~/componentsModel/TableRowCM"

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
    return (
        <tr>
          <td colSpan='3'>
            <div className="detailsContainer p-4 rounded-xl flex flex-col shadow border border-neutral-200 container min-w-full">
              <div className="top flex">
                <div className="actor w-1/3">
                  <div className="actorTitle text-neutral-400 uppercase pb-2">Actor</div>
                  <div className="actorDetails flex flex-col flex-wrap">
                    <div className="actorDetailsItems flex text-sm py-0.5">
                      <span className="itemKey text-neutral-400 w-1/3">Name</span>
                      <span className="itemValue w-2/3">{data.actor_name}</span>
                    </div>
                    <div className="actorDetailsItems flex text-sm py-0.5">
                      <span className="itemKey text-neutral-400 w-1/3">Email</span>
                      <span className="itemValue w-2/3">{data.actor_email}</span>
                    </div>
                    <div className="actorDetailsItems flex flex-wrap text-sm py-0.5">
                      <span className="itemKey text-neutral-400  w-1/3">ID</span>
                      <span className="itemValue flex flex-wrap w-2/3">{data.actor_id}</span>
                    </div>
                  </div>
                </div>
                <div className="action w-1/3">
                  <div className="actorTitle text-neutral-400 uppercase pb-2">Action</div>
                  <div className="actorDetails flex flex-col flex-wrap">
                    <div className="actorDetailsItems flex text-sm py-0.5">
                      <span className="itemKey text-neutral-400 w-1/3">Name</span>
                      <span className="itemValue w-2/3">{data.action.name}</span>
                    </div>
                    <div className="actorDetailsItems flex text-sm py-0.5">
                      <span className="itemKey text-neutral-400 w-1/3">Object</span>
                      <span className="itemValue w-2/3">{data.action.object}</span>
                    </div>
                    <div className="actorDetailsItems flex text-sm py-0.5">
                      <span className="itemKey text-neutral-400 w-1/3">ID</span>
                      <span className="itemValue w-2/3">{data.action.id}</span>
                    </div>
                  </div>
                </div>
                <div className="date w-1/3">
                  <div className="actorTitle text-neutral-400 uppercase pb-2">Date</div>
                  <div className="actorDetails flex flex-col flex-wrap">
                    <div className="actorDetailsItems  flex text-sm">
                      <span className="itemKey text-neutral-400  w-1/3">Readable</span>
                      <span className="itemValue w-2/3">{data.occurred_at.toISOString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom flex">
                <div className="metaData w-1/3 pt-4 text-neutral-400 uppercase">Metadata</div>
                <div className="target w-1/3 pt-4 text-neutral-400 uppercase">Target</div>
              </div>
            </div>
          </td>
        </tr>
    )
}