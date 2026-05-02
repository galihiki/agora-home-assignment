import {
  memo,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type UIEvent,
} from "react";
import { Box, LinearProgress, List as MuiList, ListItem } from "@mui/material";

/** Items must expose a stable `id` for keys and list identity. */
export type ListItemWithId = { id: string | number };

interface ListProps<T extends ListItemWithId> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  initialItemsToShow?: number;
  itemsPerScrollLoad?: number;
  /** When set, all `items` are shown and near-bottom scroll triggers async load (simulated API). */
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  loadingMore?: boolean;
}

function ListInner<T extends ListItemWithId>({
  items,
  renderItem,
  initialItemsToShow,
  itemsPerScrollLoad,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: ListProps<T>) {
  const loadMoreInFlight = useRef(false);
  const initialValue = initialItemsToShow ?? items.length;
  const safeInitialItems = Math.max(0, Math.min(initialValue, items.length));

  const perScrollValue = itemsPerScrollLoad ?? items.length;
  const safeItemsPerScrollLoad = Math.max(1, perScrollValue);

  const [visibleCount, setVisibleCount] = useState(safeInitialItems);

  useEffect(() => {
    setVisibleCount(safeInitialItems);
  }, [safeInitialItems, items.length]);

  const isAsyncMode = Boolean(onLoadMore);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight <= 16;

    if (!isNearBottom) {
      return;
    }

    if (isAsyncMode) {
      if (!hasMore || loadMoreInFlight.current || loadingMore) {
        return;
      }
      loadMoreInFlight.current = true;
      void onLoadMore!()
        .catch(() => {
          /* parent may toast; avoid unhandled rejection */
        })
        .finally(() => {
          loadMoreInFlight.current = false;
        });
      return;
    }

    if (visibleCount < items.length) {
      setVisibleCount((previousCount) =>
        Math.min(previousCount + safeItemsPerScrollLoad, items.length),
      );
    }
  };

  const visibleItems = isAsyncMode ? items : items.slice(0, visibleCount);

  return (
    <Box sx={{ height: "100%", width: "100%", overflowY: "scroll" }} onScroll={handleScroll}>
      <MuiList sx={{ m: 0, pl: 0, listStyleType: "none" }}>
        {visibleItems.map((item, index) => (
          <ListItem
            key={item.id}
            sx={{ display: "block", p: 0, mb: 1 }}
          >
            {renderItem(item, index)}
          </ListItem>
        ))}
      </MuiList>
      {isAsyncMode && loadingMore ? (
        <Box sx={{ py: 1 }}>
          <LinearProgress />
        </Box>
      ) : null}
    </Box>
  );
}

export default memo(ListInner) as typeof ListInner;
