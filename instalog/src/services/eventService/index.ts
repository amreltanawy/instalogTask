import { db } from "~/server/db";
import { Prisma, Event } from "@prisma/client";

class EventService {

  private db: Prisma.DefaultPrismaClient;
  constructor(db: Prisma.DefaultPrismaClient){
    this.db = db;
  }
  // create event object in the database
  async createEvent(eventData: Prisma.EventCreateInput): Promise<Event> {
    try {
      const createdEvent = await this.db.event.create({
        data: eventData,
      });

      return createdEvent;
    } catch (error) {
      throw new Error("Failed to create event");
    }
  }

  
}


const EventServiceInstance = new EventService(db)
export default EventServiceInstance;
