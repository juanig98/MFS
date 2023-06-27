import { PrismaClient } from "@prisma/client";

export class DatabaseService {

    get dbclient() { return new PrismaClient() }
}