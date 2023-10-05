// controllers/services/eventAction.ts

import { PrismaClient } from '@prisma/client';
import {db} from '../../server/db';

class EventActionService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createEventAction(data: { name: string }) {
    try {
      const createdEventAction = await this.prisma.eventAction.create({
        data,
      });
      return createdEventAction;
    } catch (error) {
      throw new Error('Failed to create event action');
    }
  }
}


const EventActionServiceInstance = new EventActionService(db)

export default EventActionServiceInstance;
