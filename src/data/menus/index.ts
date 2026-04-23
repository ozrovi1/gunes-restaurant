import type { BranchMenu, ServiceMode } from "./types";
import { enfieldMenu } from "./enfield";
import { walthamstowMenu } from "./walthamstow";
import { enfieldTakeawayMenu } from "./enfield-takeaway";
import { walthamstowTakeawayMenu } from "./walthamstow-takeaway";

export const branchMenus: Record<string, BranchMenu> = {
  enfield: enfieldMenu,
  walthamstow: walthamstowMenu,
};

export const branchTakeawayMenus: Record<string, BranchMenu> = {
  enfield: enfieldTakeawayMenu,
  walthamstow: walthamstowTakeawayMenu,
};

export function getBranchMenu(slug: string, mode: ServiceMode = "dinein"): BranchMenu | undefined {
  if (mode === "takeaway") return branchTakeawayMenus[slug];
  return branchMenus[slug];
}

export function hasTakeaway(slug: string): boolean {
  return slug in branchTakeawayMenus;
}

export * from "./types";
