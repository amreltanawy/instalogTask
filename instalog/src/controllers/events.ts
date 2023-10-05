import { NextApiRequest, NextApiResponse } from "next";

import selectors from '../selectors';
import services from '../services';

const {EventSelector} = selectors;
const {EventService} = services


class EventsConroller {
    private eventSelector: typeof EventSelector;
    private eventService: typeof EventService; 
    private request: NextApiRequest;
    private response: NextApiResponse;

    constructor(
        eventSelector: typeof EventSelector, 
        eventService: typeof EventService,
        request:NextApiRequest, 
        response:NextApiResponse){
        this.eventSelector = eventSelector;
        this.eventService = eventService;
        this.request = request;
        this.response = response
    }

    async createEvent()
    {
        try {
      
            const createdEvent = await this.eventService.createEvent(this.request.body)
      
            this.response.status(201).json(createdEvent);
            return true;
          } catch (error) {
            this.response.status(500).json({ error: "Internal Server Error" });
            return false;
          }
    }

    async getEvents() {
        // Handle GET request to list events with pagination, search, and filters
        let pagination = {page:1, itemsPerPage:10};
    try {
        const events = await this.eventSelector.listEventsOrderedByOccurredAt({pagination})
  
        this.response.status(200).json(events);
        return true;
      } catch (error) {
        this.response.status(500).json({ error: "Internal Server Error" });
        return false;
      }
    }
}

const eventsControllerInstance = (request: NextApiRequest, response:NextApiResponse) => {
    
    return new EventsConroller(
        EventSelector,
        EventService,
        request,
        response);
}

export default eventsControllerInstance;