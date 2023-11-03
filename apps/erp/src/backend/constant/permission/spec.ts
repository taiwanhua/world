// * == WARNING, NEVER MANUAL EDIT ==
// THIS FILE MUST GENERATE BY SCRIPT
// GO EDIT (command + P): workspaces/backend/src/backend/scripts/generate-types-menus-functions.ts

const permissionPaths = [] as const;

// IF NEED TO CHECK CORRECT PERMISSION PATH, PLEASE USE THIS 'PermissionPath'
// JUST USE IN DEVELOP
// OR WHEN TARGET RELEASE ENVIRONMENT'S MENUS AND FUNCTIONS DATA IS SAME AS THE DEVELOPMENT ENVIRONMENT
// export type PermissionPath = typeof permissionPaths[number];

// WHEN BUILD OR DEPLOY, PLEASE USE THIS 'PermissionPath' TO PASS TYPE CHECK
// ESPECIALLY WHEN THE TARGET RELEASE ENVIRONMENT'S MENUS AND FUNCTIONS DATA DIFFERS FROM THE DEVELOPMENT ENVIRONMENT
type AllPermissionPaths = (typeof permissionPaths)[number];
type Union<T> = T | (string & Record<never, never>);
export type PermissionPath = Union<AllPermissionPaths>;

export function getPermissionPaths(): PermissionPath[] {
  return [...permissionPaths];
}
