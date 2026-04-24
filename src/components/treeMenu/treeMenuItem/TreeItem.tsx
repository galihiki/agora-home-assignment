import type { TreeItemData } from "@/types/tree";
import { useEffect, useState } from "react";
import "./TreeItem.scss";
import { useTreeContext } from "../../../context/TreeMenuContext";
import React from "react";

interface TreeItemProps {
  treeItem: TreeItemData;
  isSelected: (id: string) => boolean;
}

function TreeItemNode({ treeItem, isSelected }: TreeItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { expandAll, searchQuery, toggleSelected } = useTreeContext();
  console.log(treeItem.label);

  useEffect(() => {
    setIsOpen(expandAll);
  }, [expandAll]);

  const openCloseHandler = () => {
    if (!treeItem.children) return;
    setIsOpen((prev) => !prev);
  };

  function highlightText(text: string) {
    if (!searchQuery) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + searchQuery.length);
    const after = text.slice(index + searchQuery.length);

    return (
      <>
        {before}
        <mark>{match}</mark>
        {after}
      </>
    );
  }

  const hasChildren = treeItem.children.length > 0;

  const selectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const checked = e.target.checked;
    toggleSelected(treeItem.id, checked);
  };

  return (
    <div className="item-container">
      <div
        className={`title ${hasChildren ? "clickable-title" : ""}`}
        onClick={openCloseHandler}
      >
        <input
          className="checkBox"
          type="checkbox"
          checked={isSelected(treeItem.id)}
          onChange={selectHandler}
          onClick={(e) => e.stopPropagation()}
        />
        {highlightText(treeItem.label)}
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
            return (
              <TreeItem
                key={child.id}
                treeItem={child}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export const TreeItem = React.memo(
  TreeItemNode,
  (prev, next) =>
    prev.treeItem.id === next.treeItem.id &&
    prev.isSelected === next.isSelected,
);
