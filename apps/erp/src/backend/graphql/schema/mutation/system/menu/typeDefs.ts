import { createSystemMenus } from "./createSystemMenus";
import { deleteSystemMenus } from "./deleteSystemMenus";
import { disableSystemMenus } from "./disableSystemMenus";
import { enableSystemMenus } from "./enableSystemMenus";
import { updateSystemMenus } from "./updateSystemMenus";

export const typeDefs = [
  createSystemMenus,
  deleteSystemMenus,
  disableSystemMenus,
  enableSystemMenus,
  updateSystemMenus,
];
