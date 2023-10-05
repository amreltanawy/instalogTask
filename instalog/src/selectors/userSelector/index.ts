import { db } from "~/server/db";
import { Prisma, User } from "@prisma/client";

class UserSelector {

  private db: Prisma.DefaultPrismaClient;
  constructor(db: Prisma.DefaultPrismaClient){
    this.db = db;
  }
  // Get user by ID or email
  async getUserByIdOrEmail(idOrEmail: string): Promise<User | null> {
    const user = await this.db.user.findFirst({
      where: {
        OR: [
          { id: idOrEmail },
          { email: idOrEmail },
        ],
      },
    });
    return user;
  }

  // Get all users with optional where filter
  async getAllUsers(where?: Prisma.UserWhereInput): Promise<User[]> {
    const users = await this.db.user.findMany({
      where,
    });
    return users;
  }
}


const UserSelectorInstance = new UserSelector(db)
export default UserSelectorInstance;


