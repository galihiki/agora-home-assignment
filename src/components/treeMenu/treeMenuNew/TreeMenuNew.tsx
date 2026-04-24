import type { TreeItemData } from "@/types/tree";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import TreeItemNew from "../TreeItemNew/TreeItemNew";
import { TreeContextNew } from "../../../context/TreeMenuNewContext";
import { useDebounce } from "../../../hooks/actions/useDebounce";
import "./TreeMenuNew.scss";

export default function TreeMenuNew() {
  const [treeData, setTreeData] = useState<TreeItemData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const getTreeData = async () => {
      try {
        const res = await fetch(
          "https://gist.githubusercontent.com/TsPuujee/fc4975500b4ee8d01064ec51bf53fe16/raw/google_product_category.json",
        );
        const data = await res.json();
        setTreeData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTreeData();
  }, []);

  const filterTree = (tree: TreeItemData[], query: string): TreeItemData[] => {
    const lowerQuery = query.toLowerCase();

    const result: TreeItemData[] = [];

    for (const node of tree) {
      let filteredChildren: TreeItemData[] = [];

      if (node.children && node.children.length > 0) {
        filteredChildren = filterTree(node.children, query);
      }

      if (
        node.label.toLowerCase().includes(lowerQuery) ||
        filteredChildren.length > 0
      ) {
        result.push({
          ...node,
          children: filteredChildren,
        });
      }
    }

    return result;
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchQuery(search);
    search ? setExpandAll(true) : setExpandAll(false);
  };

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev);
  };

  const filteredTree = useMemo(() => {
    if (!searchQuery) return treeData;
    return filterTree(treeData, searchQuery);
  }, [treeData, debouncedSearchQuery]);

  const isSelected = useCallback(
    (id: string) => {
      return selected.includes(id);
    },
    [selected],
  );

  const toggleSelected = useCallback((id: string, checked: boolean) => {
    setSelected((prev) => {
      return checked
        ? [...prev, id]
        : prev.filter((selectedId) => selectedId !== id);
    });
  }, []);

  return (
    <div className="tree-menu-new-container">
      <div className="actions">
        <div className="search">
          <span>Search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button onClick={handleExpandAll}>
          {expandAll ? "Collaps All" : "Expand All"}
        </button>
      </div>
      <TreeContextNew.Provider
        value={{ searchQuery: debouncedSearchQuery, expandAll, toggleSelected }}
      >
        {filteredTree.map((child) => {
          return (
            <TreeItemNew
              key={child.id}
              treeItem={child}
              isSelected={isSelected}
            />
          );
        })}
      </TreeContextNew.Provider>
    </div>
  );
}
