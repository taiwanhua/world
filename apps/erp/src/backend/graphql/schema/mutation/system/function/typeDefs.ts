import { createSystemFunctions } from "./createSystemFunctions";
import { deleteSystemFunctions } from "./deleteSystemFunctions";
import { disableSystemFunctions } from "./disableSystemFunctions";
import { enableSystemFunctions } from "./enableSystemFunctions";
import { updateSystemFunctions } from "./updateSystemFunctions";

export const typeDefs = [
  createSystemFunctions,
  deleteSystemFunctions,
  disableSystemFunctions,
  enableSystemFunctions,
  updateSystemFunctions,
];
