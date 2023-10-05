// controllers/eventActionController.ts

import { NextApiRequest, NextApiResponse } from 'next';
import selectors from '../selectors';
import services from '../services';


const {EventActionSelector} = selectors;
const {EventActionService} = services


class EventActionController {
  private eventActionSelector: typeof EventActionSelector;
  private eventActionService: typeof EventActionService;
  private request: NextApiRequest;
  private response: NextApiResponse;

  constructor(
    eventActionSelector: typeof EventActionSelector,
    eventActionService: typeof EventActionService,
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    this.eventActionSelector = eventActionSelector;
    this.eventActionService = eventActionService;
    this.request = request;
    this.response = response;
  }

  async createEventAction() {
    try {
      const createdEventAction = await this.eventActionService.createEventAction(this.request.body);
      this.response.status(201).json(createdEventAction);
      return true;
    } catch (error) {
      this.response.status(500).json({ error: 'Internal Server Error' });
      return false;
    }
  }

  async getEventActionByName(name: string) {
    try {
      const eventAction = await this.eventActionSelector.getEventActionByName(name);
      if (eventAction) {
        this.response.status(200).json(eventAction);
        return true;
      } else {
        this.response.status(404).json({ error: 'Event Action not found' });
        return false;
      }
    } catch (error) {
      this.response.status(500).json({ error: 'Internal Server Error' });
      return false;
    }
  }

  async listEventActions() {
    try {
      const eventActions = await this.eventActionSelector.listEventActions();
      this.response.status(200).json(eventActions);
      return true;
    } catch (error) {
      this.response.status(500).json({ error: 'Internal Server Error' });
      return false;
    }
  }
}


const eventActionsControllerInstance = (request: NextApiRequest, response:NextApiResponse) => {
    
    return new EventActionController(
        EventActionSelector,
        EventActionService,
        request,
        response);
}

export default eventActionsControllerInstance;
