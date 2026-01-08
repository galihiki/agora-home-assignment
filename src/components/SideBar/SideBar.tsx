import type { SideBarItem, SideBarProps } from "../../types/sideBar";
import { Link } from "react-router-dom";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import "./SideBar.scss";
import { useState } from "react";
import { DynamicIcon } from "../Icon/Icon";

export default function SideBar({ items }: SideBarProps) {
  const [collaps, setCollaps] = useState<boolean>(false);

  return (
    <div
      className={`sidebar-container ${
        collaps ? "sidebar-collaps" : "sidebar-expand"
      }`}
    >
      <div className="sidebar-header">
        {!collaps && <div className="sidebar-title">Side Navbar</div>}
        {collaps ? (
          <GoSidebarExpand
            onClick={() => setCollaps(!collaps)}
            className="collaps-icon"
          />
        ) : (
          <GoSidebarCollapse
            onClick={() => setCollaps(!collaps)}
            className="collaps-icon"
          />
        )}
      </div>
      <nav className="nav">
        {items.map((item: SideBarItem, index) => (
          <Link to={item.path} key={index} className="link">
            <DynamicIcon name={item.iconName} type={item.iconType} size={18} />
            {!collaps && <div className="link-lable">{item.title}</div>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
