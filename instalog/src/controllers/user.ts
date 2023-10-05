import { NextApiRequest, NextApiResponse } from 'next';
import selectors from '../selectors'; // Import your user selectors
import services from '../services'; // Import your user services

const { UserSelector } = selectors; // Use your user selectors
const { UserService } = services; // Use your user services

class UserController {
  private userSelector: typeof UserSelector;
  private userService: typeof UserService;
  private request: NextApiRequest;
  private response: NextApiResponse;

  constructor(
    userSelector: typeof UserSelector,
    userService: typeof UserService,
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    this.userSelector = userSelector;
    this.userService = userService;
    this.request = request;
    this.response = response;
  }

  async createUser() {
    try {
      // Call your user service method to create a user
      const createdUser = await this.userService.createUser(this.request.body);

      this.response.status(201).json(createdUser);
      return true;
    } catch (error) {
      this.response.status(500).json({ error: 'Internal Server Error' });
      return false;
    }
  }

  async getUserById(userId: string) {
    try {
      // Call your user selector method to fetch a user by ID
      const user = await this.userSelector.getUserByIdOrEmail(userId);

      if (user) {
        this.response.status(200).json(user);
        return true;
      } else {
        this.response.status(404).json({ error: 'User not found' });
        return false;
      }
    } catch (error) {
      this.response.status(500).json({ error: 'Internal Server Error' });
      return false;
    }
  }

  async updateUser(userId: string) {
    try {
      // Call your user service method to update a user by ID
      const updatedUser = await this.userService.updateUser(
        userId,
        this.request.body
      );

      if (updatedUser) {
        this.response.status(200).json(updatedUser);
        return true;
      } else {
        this.response.status(404).json({ error: 'User not found' });
        return false;
      }
    } catch (error) {
      this.response.status(500).json({ error: 'Internal Server Error' });
      return false;
    }
  }

  async deleteUser(userId: string) {
    try {
      // Call your user service method to delete a user by ID
      await this.userService.deleteUser(userId);

      this.response.status(204).end();
      return true;
    } catch (error) {
      this.response.status(500).json({ error: 'Internal Server Error' });
      return false;
    }
  }
}

const userControllerInstance = (request: NextApiRequest, response: NextApiResponse) => {
  return new UserController(UserSelector, UserService, request, response);
};

export default userControllerInstance;
