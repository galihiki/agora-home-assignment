import type { TreeItemData } from "@/types/tree";
import { useState } from "react";
import "./TreeItem.scss";

export function TreeItem({ treeItem }: { treeItem: TreeItemData }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openCloseHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const hasChildren = treeItem.children.length > 0;

  return (
    <div className="item-container">
      <div className="title" onClick={openCloseHandler}>
        {treeItem.label}
        {hasChildren &&
          (isOpen ? (
            <span className="open-close">-</span>
          ) : (
            <span className="open-close">+</span>
          ))}
      </div>
      {isOpen && (
        <div>
          {treeItem.children.map((child) => {
            return <TreeItem key={child.id} treeItem={child} />;
          })}
        </div>
      )}
    </div>
  );
}
