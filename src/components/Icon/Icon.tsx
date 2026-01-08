import React from "react";
import * as CI from "react-icons/ci"; // Circum icons
import * as MD from "react-icons/md"; // Material icons
import type { IconType } from "../../types/Icon";

const iconPacks = {
  CI,
  MD,
} as const;

// Props interface
interface DynamicIconProps {
  name: string; // Name of the icon, e.g., "CiHome" or "MdHome"
  type: IconType;
  size?: number;
  color?: string;
}

// Functional component
export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  type,
  size = 24,
  color = "currentColor",
}) => {
  const IconPack = iconPacks[type];
  const IconComponent = IconPack[
    name as keyof typeof IconPack
  ] as React.ComponentType<{ size?: number; color?: string }>;

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} />;
};
