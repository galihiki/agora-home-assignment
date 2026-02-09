import type { TreeItemData } from "@/types/tree";
import { useEffect, useState } from "react";
import "./TreeItem.scss";
import { useTreeContext } from "../../../context/TreeMenuContext";

interface TreeItemProps {
  treeItem: TreeItemData;
}

export function TreeItem({ treeItem }: TreeItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { expandAll, searchQuery, selected, setSelected } = useTreeContext();
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

  const isSelected = selected.includes(treeItem.id);

  const selectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const checked = e.target.checked;
    setSelected((prev) => {
      return checked
        ? [...prev, treeItem.id]
        : prev.filter((id) => id !== treeItem.id);
    });
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
          checked={isSelected}
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
            return <TreeItem key={child.id} treeItem={child} />;
          })}
        </div>
      )}
    </div>
  );
}
