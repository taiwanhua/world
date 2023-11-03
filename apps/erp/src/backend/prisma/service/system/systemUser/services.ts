import { createSystemUsers } from "./createSystemUsers";
import { deleteSystemUsers } from "./deleteSystemUsers";
import { disableSystemUsers } from "./disableSystemUsers";
import { enableSystemUsers } from "./enableSystemUsers";
import { loginSystemUser } from "./loginSystemUser";
import { systemUserSummary } from "./systemUserSummary";
import { updateSystemUsers } from "./updateSystemUsers";

export const systemUserServices = {
  createSystemUsers,
  deleteSystemUsers,
  disableSystemUsers,
  enableSystemUsers,
  loginSystemUser,
  systemUserSummary,
  updateSystemUsers,
};
