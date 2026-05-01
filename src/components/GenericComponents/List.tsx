import "./List.scss";
import type { ReactNode } from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

export default function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <div className="generic-list-container">
      <ul className="generic-list">
        {items.map((item, index) => (
          <li key={index}>{renderItem(item, index)}</li>
        ))}
      </ul>
    </div>
  );
}
