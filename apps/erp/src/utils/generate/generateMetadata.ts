import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { prisma } from "@/backend/prisma/prisma";
import { generateTree } from "@/utils/generate/generateTree";
import type { MenuTree } from "@/utils/generate/generatePermissionPath";

interface MetadataInfo {
  metadata: Metadata;
  currentMenuTree: MenuTree[];
}

export const generateMetadata = async (
  _props: unknown, //   { params, searchParams }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> => {
  const pathname = headers().get("x-url-pathname");

  if (!pathname) {
    return {
      title: "Wowgo ERP",
      description: "The best ERP system",
    };
  }

  const systemMenus = await prisma.system_menu.findMany();

  const menuTree = generateTree(systemMenus, {
    dataField: null,
    parentId: "parent_id",
  }) as MenuTree[];

  const pathnameSplit = pathname.split("/").filter(Boolean);

  const { metadata } = pathnameSplit.reduce<MetadataInfo>(
    (accumulator, pathnameString) => {
      const findMenuTree = accumulator.currentMenuTree.find(
        (tree) => tree.pathname === pathnameString,
      );

      if (findMenuTree) {
        accumulator.currentMenuTree = findMenuTree.children;
        accumulator.metadata = {
          title: `Wowgo ERP - ${findMenuTree.name}`,
          description: findMenuTree.tableMemo,
          // openGraph: {
          //   images: ["/some-specific-page-image.jpg", ...previousImages],
          // },
        };
      }

      if (!findMenuTree) {
        accumulator.metadata = {
          title: "Wowgo ERP - Not Found",
          description: "The best ERP system",
        };
      }
      return accumulator;
    },
    {
      metadata: {},
      currentMenuTree: menuTree,
    },
  );

  return metadata;
};
