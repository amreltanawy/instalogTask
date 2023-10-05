import { db } from "~/server/db";
import { Prisma, EventAction } from "@prisma/client";

class EventActionSelector {

  private db: Prisma.DefaultPrismaClient;
  constructor(db: Prisma.DefaultPrismaClient){
    this.db = db;
  }
  // Get event by ID
  async getEventActionByName(name: string): Promise<EventAction | null> {
    const eventAction = await this.db.eventAction.findUnique({
      where: {
        name,
      },
    });
    return eventAction;
  }

  // List events ordered by occurred_at
  async listEventActions(): Promise<EventAction[]> {
    const eventActions = await this.db.eventAction.findMany();
    return eventActions;
  }
}


const EventActionSelectorInstance = new EventActionSelector(db)

export default EventActionSelectorInstance;
