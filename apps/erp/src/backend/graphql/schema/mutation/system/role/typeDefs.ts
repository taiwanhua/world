import { createSystemRoles } from "./createSystemRoles";
import { deleteSystemRoles } from "./deleteSystemRoles";
import { disableSystemRoles } from "./disableSystemRoles";
import { enableSystemRoles } from "./enableSystemRoles";
import { updateSystemRoles } from "./updateSystemRoles";

export const typeDefs = [
  createSystemRoles,
  deleteSystemRoles,
  disableSystemRoles,
  enableSystemRoles,
  updateSystemRoles,
];
