import { useEffect, useMemo, useState, type ReactNode, type UIEvent } from "react";
import { Box, List as MuiList, ListItem } from "@mui/material";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  initialItemsToShow?: number;
  itemsPerScrollLoad?: number;
}

export default function List<T>({
  items,
  renderItem,
  initialItemsToShow,
  itemsPerScrollLoad,
}: ListProps<T>) {
  const safeInitialItems = useMemo(() => {
    const value = initialItemsToShow ?? items.length;
    return Math.max(0, Math.min(value, items.length));
  }, [initialItemsToShow, items.length]);

  const safeItemsPerScrollLoad = useMemo(() => {
    const value = itemsPerScrollLoad ?? items.length;
    return Math.max(1, value);
  }, [itemsPerScrollLoad, items.length]);

  const [visibleCount, setVisibleCount] = useState(safeInitialItems);

  useEffect(() => {
    setVisibleCount(safeInitialItems);
  }, [safeInitialItems, items.length]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight <= 16;

    if (isNearBottom && visibleCount < items.length) {
      setVisibleCount((previousCount) =>
        Math.min(previousCount + safeItemsPerScrollLoad, items.length),
      );
    }
  };

  const visibleItems = items.slice(0, visibleCount);

  return (
    <Box sx={{ height: "100%", width: "100%", overflowY: "scroll" }} onScroll={handleScroll}>
      <MuiList sx={{ m: 0, pl: 0, listStyleType: "none" }}>
        {visibleItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{ display: "block", p: 0, mb: 1 }}
          >
            {renderItem(item, index)}
          </ListItem>
        ))}
      </MuiList>
    </Box>
  );
}
