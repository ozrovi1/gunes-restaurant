import type { BranchMenu } from "./types";
import { enfieldMenu } from "./enfield";
import { walthamstowMenu } from "./walthamstow";

export const branchMenus: Record<string, BranchMenu> = {
  enfield: enfieldMenu,
  walthamstow: walthamstowMenu,
};

export function getBranchMenu(slug: string): BranchMenu | undefined {
  return branchMenus[slug];
}

export * from "./types";
