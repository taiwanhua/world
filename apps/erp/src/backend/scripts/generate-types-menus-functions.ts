import path from "node:path";
import { writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import pkgDir from "pkg-dir";
import { generatePermissionPath } from "../../utils/generate/generatePermissionPath";
import { prisma } from "../prisma/prisma";
//import prettier from "prettier";
import { systemMenuParser } from "../graphql/parsers/system/systemMenuParser";
import { systemFunctionParser } from "../graphql/parsers/system/systemFunctionParser";

async function main(): Promise<void> {
  const allMenus = await prisma.system_menu.findMany();
  const allFunctions = await prisma.system_function.findMany();

  const systemMenus = allMenus.map(systemMenuParser);
  const systemFunctions = allFunctions.map(systemFunctionParser);

  systemMenus.forEach((systemMenu) => {
    systemMenu.systemFunctions = systemFunctions.filter(
      (systemFunction) => systemFunction.menuId === systemMenu.id,
    );
  });

  const context = generatePermissionPath(systemMenus);

  const text = `
    // * == WARNING, NEVER MANUAL EDIT ==
    // THIS FILE MUST GENERATE BY SCRIPT
    // GO EDIT (command + P): workspaces/backend/src/backend/scripts/${path.basename(
      __filename,
    )}

    const permissionPaths = ${JSON.stringify(context, null, 2)} as const;

    // IF NEED TO CHECK CORRECT PERMISSION PATH, PLEASE USE THIS 'PermissionPath'
    // JUST USE IN DEVELOP
    // OR WHEN TARGET RELEASE ENVIRONMENT'S MENUS AND FUNCTIONS DATA IS SAME AS THE DEVELOPMENT ENVIRONMENT
    // export type PermissionPath = typeof permissionPaths[number];


    // WHEN BUILD OR DEPLOY, PLEASE USE THIS 'PermissionPath' TO PASS TYPE CHECK
    // ESPECIALLY WHEN THE TARGET RELEASE ENVIRONMENT'S MENUS AND FUNCTIONS DATA DIFFERS FROM THE DEVELOPMENT ENVIRONMENT
    type AllPermissionPaths = typeof permissionPaths[number];
    type Union<T> = T | (string & Record<never, never>);
    export type PermissionPath = Union<AllPermissionPaths>;


    export function getPermissionPaths(): PermissionPath[] {
      return [...permissionPaths];
    }
  `;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const workspacesFolder = path.resolve(pkgDir.sync() ?? __dirname, "..");
  const folderPaths = [
    // `${pkgPath}backend/src/backend/system/permission/`,
    // `${pkgPath}client/src/system/permission/`,
    path.resolve(
      workspacesFolder,
      "erp",
      "src",
      "backend",
      "constant",
      "permission",
    ),
  ];

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  folderPaths.forEach(async (folderPath) => {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
      // eslint-disable-next-line no-console
      console.log(`Folder ${folderPath} Created Successfully.`);
    }

    const filePath = path.resolve(folderPath, "spec.ts");

    await writeFile(filePath, text);
    // eslint-disable-next-line no-console
    console.log(`Create ${folderPath} Permissions success`);
  });
}

// * == WARNING, DO NOT EDIT EXCEPT YOU KNOW WHAT ARE YOU DOING ==

void main();

export {};
