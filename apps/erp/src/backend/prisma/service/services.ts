import type { PrismaClient } from "@prisma/client";
import { prisma } from "@/backend/prisma/prisma";
import { systemServices } from "./system/services";

const services = {
  ...systemServices,
};

export class Services {
  prisma: PrismaClient;
  services: typeof services;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient ?? prisma;
    this.services = services;
  }
}
