import { db } from "~/server/db";
import { Prisma, Event } from "@prisma/client";

type Pagination = {
  page: number;
  itemsPerPage: number;
}

type EventFilter = {
  occurredAtOrder?: string;

}

type ListEventsParams = {
  eventFilter?: EventFilter;
  pagination: Pagination;
}

class EventSelector {

  private db: Prisma.DefaultPrismaClient;
  constructor(db: Prisma.DefaultPrismaClient){
    this.db = db;
  }
  // Get event by ID
  async getEventById(id: string): Promise<Event | null> {
    const event = await this.db.event.findUnique({
      where: {
        id,
      },
    });
    return event;
  }

  // List events ordered by occurred_at
  async listEventsOrderedByOccurredAt({eventFilter, pagination}:ListEventsParams): Promise<Event[]> {

    const skip = (pagination.page -1) * pagination.itemsPerPage;

    let eventDelegate:Prisma.EventFindManyArgs = {
      skip,
      orderBy: {
        occurred_at: "desc", // or "desc" for descending order
      },
    }
    if (eventFilter != null){
      eventDelegate.where = eventFilter as Prisma.EventWhereInput;
    }
    
    const events = await this.db.event.findMany(eventDelegate);
    return events;
  }
}


const EventSelectorInstance = new EventSelector(db)
export default EventSelectorInstance;
