import type { TreeItemData } from "../../../types/tree";
import { useEffect, useMemo, useState } from "react";
import { TreeItem } from "../treeMenuItem/TreeItem";
import { type ChangeEvent } from "react";
import { useDebounce } from "../../../hooks/actions/useDebounce";
import "./TreeMenu.scss";
import { TreeContext } from "../../../context/TreeMenuContext";

export default function TreeMenu() {
  const [treeMenuData, setTreeMenuData] = useState<TreeItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const getTreeMenuData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://gist.githubusercontent.com/TsPuujee/fc4975500b4ee8d01064ec51bf53fe16/raw/google_product_category.json",
        );
        const data = await res.json();
        setTreeMenuData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    getTreeMenuData();
  }, []);

  //filter and search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    search ? setExpandAll(true) : setExpandAll(false);
    setSearchQuery(search);
  };

  const filterTree = (nodes: TreeItemData[]): TreeItemData[] => {
    return nodes
      .map((node) => {
        const children = node.children ? filterTree(node.children) : [];
        if (
          node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          children.length > 0
        ) {
          return { ...node, children };
        }
        return null;
      })
      .filter(Boolean) as TreeItemData[];
  };

  const debouncedQuery = useDebounce(searchQuery, 300);

  const filteredTree = useMemo(() => {
    if (!debouncedQuery) return treeMenuData;
    return filterTree(treeMenuData);
  }, [treeMenuData, debouncedQuery]);

  //expand
  const expandHandler = () => {
    setExpandAll((prev) => !prev);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (treeMenuData.length === 0)
    return <div className="no-items">No Items</div>;

  return (
    <>
      <div className="tree-menu-container">
        <div className="actions">
          <div>
            <span>Search</span>
            <input type="text" value={searchQuery} onChange={handleSearch} />
          </div>
          <button onClick={expandHandler}>
            {expandAll ? "Collapse All" : "Expand All"}
          </button>
        </div>
        <TreeContext.Provider
          value={{ expandAll, searchQuery, selected, setSelected }}
        >
          {filteredTree.map((child) => {
            return <TreeItem key={child.id} treeItem={child} />;
          })}
        </TreeContext.Provider>
      </div>
      <div>
        {selected.map((s) => (
          <div>{s}</div>
        ))}
      </div>
    </>
  );
}
