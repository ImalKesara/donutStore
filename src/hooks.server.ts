import { PrismaClient } from '@prisma/client';

// after inilize this we can control db / fetch data and more ...
export const db = new PrismaClient();
