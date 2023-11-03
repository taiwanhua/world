// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_user as SystemUser } from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";

export interface Params {
  args: Prisma.system_userUpdateArgs | Prisma.system_userUpdateArgs[];
  locals: Locals;
}

export interface Return {
  data: SystemUser[];
  count: number;
}

export async function updateSystemUsers({
  // locals,
  // args: { data, skipDuplicates },
  args,
}: Params): Promise<Return> {
  // const updatedUser = locals.updatedUser;

  // const dataList = Array.isArray(data) ? data : [data];

  // const createData = dataList.map((user) => ({
  //   ...user,
  //   id: uuidv4(),
  //   created_user: updatedUser,
  //   updated_user: updatedUser,
  // }));

  const res = await prisma.$transaction(async (tx) => {
    const argsList = Array.isArray(args) ? args : [args];

    const promises = argsList.map((arg) => tx.system_user.update(arg));

    const updateUsers = await Promise.all(promises);
    return updateUsers;
  });

  return { data: res, count: res.length };
}
