import { Prisma, PrismaClient, User } from '@prisma/client';
import {hash, compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "~/env.mjs";
import {db} from "../../server/db"


class UserService {
  private db: PrismaClient;
  private secretKey: string; // Secret key for JWT

  constructor(db: PrismaClient, secretKey: string) {
    this.db = db;
    this.secretKey = secretKey;
  }

  // Create a new user
  async createUser(userData: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput> {
    try {
      const createdUser = await this.db.user.create({
        data: userData,
      });

      return createdUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  // Get a user by ID
  async getUserById(userId: string): Promise<Prisma.UserCreateInput | null> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (error) {
      throw new Error('Failed to fetch user by ID');
    }
  }

  // Update a user by ID
  async updateUser(userId: string, userData: Prisma.UserUpdateInput): Promise<Prisma.UserCreateInput | null> {
    try {
      const updatedUser = await this.db.user.update({
        where: {
          id: userId,
        },
        data: userData,
      });

      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  // Delete a user by ID
  async deleteUser(userId: string): Promise<void> {
    try {
      await this.db.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }

  // Register a new user
  async registerUser(userData: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput> {
    // Hash the user's password before storing it in the database
    const hashedPassword = await hash(userData.password, 10);

    try {
      const createdUser = await this.db.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      return createdUser;
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }

  // Login and return a JWT token and user object on success
  async loginUser(email: string, password: string): Promise<{ token: string; user: User } | null> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return null; // User not found
      }

      // Verify the password
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return null; // Incorrect password
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, this.secretKey, {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      });

      return {
        token,
        user,
      };
    } catch (error) {
      throw new Error('Login failed');
    }
  }
}


const UserServiceInstance = new UserService(db, env.secret_key )

export default UserServiceInstance;
