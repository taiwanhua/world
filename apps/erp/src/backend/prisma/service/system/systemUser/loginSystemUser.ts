import { v4 as uuidv4 } from "uuid";
import type { system_user as SystemUser } from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { createSystemUsers } from "./createSystemUsers";

type LoginSystemUserArgs = Pick<
  SystemUser,
  | "email"
  | "provider"
  | "provider_id"
  | "given_name"
  | "family_name"
  | "picture"
  | "locale"
>;

export interface Params {
  args: LoginSystemUserArgs;
  locals: Locals;
}

export interface Return {
  data: SystemUser;
}

// for provider User login
export async function loginSystemUser({
  locals,
  args: {
    email,
    provider,
    provider_id: providerId,
    family_name: familyName,
    given_name: givenName,
    picture,
    locale,
  },
}: Params): Promise<Return> {
  const updatedUser = locals.updatedUser;

  const providerUser = await prisma.system_user.findFirst({
    where: {
      provider,
      provider_id: providerId,
    },
  });

  if (providerUser) {
    return { data: providerUser };
  }

  const emailUser = await prisma.system_user.findFirst({
    where: {
      email,
    },
  });

  if (
    emailUser &&
    emailUser.provider === provider &&
    emailUser.provider_id === ""
  ) {
    await prisma.system_user.update({
      data: {
        provider_id: providerId,
      },
      where: {
        email,
      },
    });
  }

  if (emailUser) {
    return { data: emailUser };
  }

  const { data } = await createSystemUsers({
    locals,
    args: {
      data: {
        id: uuidv4(),
        display_name: email.split("@")[0] ?? "",
        email,
        provider,
        provider_id: providerId,
        family_name: familyName,
        given_name: givenName,
        language: "",
        password: "",
        picture,
        locale,
        created_user: updatedUser,
        updated_user: updatedUser,
      },
    },
  });

  return { data: data[0] };
}
