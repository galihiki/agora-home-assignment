import { memo, useRef, type ReactNode, type UIEvent } from "react";
import { Box, LinearProgress, List as MuiList, ListItem } from "@mui/material";

/** Items must expose a stable `id` for keys and list identity. */
export type ListItemWithId = { id: string | number };

interface ListProps<T extends ListItemWithId> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** Near-bottom scroll triggers this; parent appends rows and updates `items`. */
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loadingMore: boolean;
}

function ListInner<T extends ListItemWithId>({
  items,
  renderItem,
  onLoadMore,
  hasMore,
  loadingMore,
}: ListProps<T>) {
  const loadMoreInFlight = useRef(false);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight <= 16;

    if (!isNearBottom || !hasMore || loadMoreInFlight.current || loadingMore) {
      return;
    }

    loadMoreInFlight.current = true;
    void onLoadMore()
      .catch(() => {
        /* parent may toast; avoid unhandled rejection */
      })
      .finally(() => {
        loadMoreInFlight.current = false;
      });
  };

  return (
    <Box sx={{ height: "100%", width: "100%", overflowY: "scroll" }} onScroll={handleScroll}>
      <MuiList sx={{ m: 0, pl: 0, listStyleType: "none" }}>
        {items.map((item, index) => (
          <ListItem key={item.id} sx={{ display: "block", p: 0, mb: 1 }}>
            {renderItem(item, index)}
          </ListItem>
        ))}
      </MuiList>
      {loadingMore ? (
        <Box sx={{ py: 1 }}>
          <LinearProgress />
        </Box>
      ) : null}
    </Box>
  );
}

export default memo(ListInner) as typeof ListInner;
