// pages/api/events.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import EventController from "../../../controllers/events"

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let isRequestSuccessful = false;
  if (req.method === "POST") {
    // Handle POST request to create a new event
    isRequestSuccessful = await EventController(req,res).createEvent()
    
    
  } else if (req.method === "GET") {
    // Handle GET request to list events with pagination, search, and filters
    isRequestSuccessful = await EventController(req,res).getEvents()

}

if(!isRequestSuccessful){
    console.log("something went wrong while creating event", req)

}
}
