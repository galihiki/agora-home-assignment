import type { TreeItemData } from "../../../types/tree";
import { useEffect, useState } from "react";
import { TreeItem } from "../treeMenuItem/TreeItem";
import "./TreeMenu.scss";

export default function TreeMenu() {
  const [treeMenuData, setTreeMenuData] = useState<TreeItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (treeMenuData.length === 0)
    return <div className="no-items">No Items</div>;

  return (
    <div className="tree-menu-new-container">
      {treeMenuData.map((child) => {
        return <TreeItem key={child.id} treeItem={child} />;
      })}
    </div>
  );
}
