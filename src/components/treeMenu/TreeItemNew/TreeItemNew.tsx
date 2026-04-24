import type { TreeItemData } from "@/types/tree";
import "./TreeItemNew.scss";
import { useEffect, useState } from "react";
import { useTreeNewContext } from "../../../context/TreeMenuNewContext";

interface TreeItemProps {
  treeItem: TreeItemData;
  isSelected: (id: string) => boolean;
}

export default function TreeItemNew({ treeItem, isSelected }: TreeItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { searchQuery, expandAll, toggleSelected } = useTreeNewContext();
  console.log(treeItem.label + "   " + searchQuery);

  useEffect(() => {
    setIsOpen(expandAll);
  }, [expandAll]);

  const handleOpenClose = () => {
    if (treeItem.children.length === 0) return;
    setIsOpen((prev) => !prev);
  };

  const hasChildren = treeItem.children.length > 0;

  const renderLabelWithHighlight = (label: string, query: string) => {
    if (!query) return label;

    const lowerLabel = label.toLowerCase();
    const lowerQuery = query.toLowerCase();

    const index = lowerLabel.indexOf(lowerQuery);
    if (index === -1) return label;

    const beforeMatch = label.slice(0, index);
    const match = label.slice(index, index + query.length);
    const afterMatch = label.slice(index + query.length);

    return (
      <>
        {beforeMatch}
        <mark>{match}</mark>
        {afterMatch}
      </>
    );
  };

  const handleSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleSelected(treeItem.id, e.target.checked);
  };

  return (
    <div className="tree-item-new-container">
      <div className="title-container" onClick={handleOpenClose}>
        <input
          type="checkbox"
          checked={isSelected(treeItem.id)}
          onChange={handleSelected}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="title">
          {renderLabelWithHighlight(treeItem.label, searchQuery)}
        </span>

        {hasChildren && (isOpen ? <span>-</span> : <span>+</span>)}
      </div>
      {isOpen &&
        hasChildren &&
        treeItem.children.map((child) => {
          return (
            <TreeItemNew
              key={child.id}
              treeItem={child}
              isSelected={isSelected}
            />
          );
        })}
    </div>
  );
}
