// pages/api/eventActions.ts

import { NextApiRequest, NextApiResponse } from 'next';
import EventActionController from '../../../controllers/eventAction';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let isRequestSuccessful = false;

  const eventActionController = EventActionController(
    req,
    res
  );

  if (req.method === 'POST') {
    isRequestSuccessful = await eventActionController.createEventAction();
  } else if (req.method === 'GET') {
    if (req.query.name) {
        const name = req.query.name as string;
      isRequestSuccessful = await eventActionController.getEventActionByName(name);
    } else {
      isRequestSuccessful = await eventActionController.listEventActions();
    }
  }

  if (!isRequestSuccessful) {
    console.log('Something went wrong with the event action operation', req.method, req.query);
  }
}
