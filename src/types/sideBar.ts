import type { IconType } from "./Icon";

export interface SideBarItem {
  title: string;
  iconName: string;
  iconType: IconType;
  path: string;
}

export interface SideBarProps {
  items: SideBarItem[];
}