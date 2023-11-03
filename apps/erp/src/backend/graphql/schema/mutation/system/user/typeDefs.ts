import { createSystemUsers } from "./createSystemUsers";
import { deleteSystemUsers } from "./deleteSystemUsers";
import { disableSystemUsers } from "./disableSystemUsers";
import { enableSystemUsers } from "./enableSystemUsers";
import { updateSystemUsers } from "./updateSystemUsers";

export const typeDefs = [
  createSystemUsers,
  deleteSystemUsers,
  disableSystemUsers,
  enableSystemUsers,
  updateSystemUsers,
];
