
export interface EventInterface {
    id: string;
    object: string;
    actor_id: string;
    actor_name: string;
    actor_email: string;
    group: string;
    action: {
      id: string;
      object: string;
      name: string;
    };
    target_id: string;
    target_name: string;
    location: string;
    occurred_at: Date;
    metadata: {
      redirect: string;
      description: string;
      x_request_id: string;
    };
  }
class TableRowCM {
    public eventData: EventInterface;
    public detailedView : Boolean;

    constructor(eventData: EventInterface, detailedView: Boolean = false){
        this.eventData = eventData;
        this.detailedView = detailedView;
    }
}

export default TableRowCM;
