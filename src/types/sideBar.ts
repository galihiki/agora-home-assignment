export interface SideBarItem {
  title: string;
  iconName: string;
  path: string;
}

export interface SideBarProps {
  items: SideBarItem[];
}