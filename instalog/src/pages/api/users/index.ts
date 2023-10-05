// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';
import UserController from '../../../controllers/user'; // Import your user controller

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let isRequestSuccessful = false;

  if (req.method === 'POST') {
    // Handle POST request to create a new user
    isRequestSuccessful = await UserController(req, res).createUser();
  } else if (req.method === 'GET') {
    // Handle GET request to get a user by ID
    const userId = req.query.id as string;
    isRequestSuccessful = await UserController(req, res).getUserById(userId);
  } else if (req.method === 'PUT') {
    // Handle PUT request to update a user by ID
    const userId = req.query.id as string;
    isRequestSuccessful = await UserController(req, res).updateUser(userId);
  } else if (req.method === 'DELETE') {
    // Handle DELETE request to delete a user by ID
    const userId = req.query.id as string;
    isRequestSuccessful = await UserController(req, res).deleteUser(userId);
  }

  if (!isRequestSuccessful) {
    console.log('Something went wrong with the user operation', req.method, req.query);
  }
}
