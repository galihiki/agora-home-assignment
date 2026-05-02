import { useCallback, useEffect, useState } from "react";
import List from "../GenericComponents/List";
import { eventMockData, type EventItem } from "./eventMockData";
import EventItemComponent from "./EventItem/EventItem";
import { Box, CircularProgress } from "@mui/material";

const ALL_EVENTS = eventMockData.events;
const INITIAL_COUNT = 20;
const SCROLL_PAGE_SIZE = 10;
const INITIAL_FETCH_DELAY_MS = 600;
const LOAD_MORE_DELAY_MS = 400;

export default function EventList() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadInitial = async () => {
      await new Promise((resolve) => setTimeout(resolve, INITIAL_FETCH_DELAY_MS));
      if (cancelled) return;
      setItems(ALL_EVENTS.slice(0, INITIAL_COUNT));
      setInitialLoading(false);
    };

    void loadInitial();

    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = useCallback(async () => {
    setLoadingMore(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, LOAD_MORE_DELAY_MS));
      setItems((prev) => {
        if (prev.length >= ALL_EVENTS.length) {
          return prev;
        }
        const next = ALL_EVENTS.slice(prev.length, prev.length + SCROLL_PAGE_SIZE);
        return [...prev, ...next];
      });
    } finally {
      setLoadingMore(false);
    }
  }, []);

  const hasMore = items.length < ALL_EVENTS.length;

  const renderEvent = (event: EventItem) => <EventItemComponent event={event} />;

  if (initialLoading) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", width: "100%", overflowY: "hidden", p: 2 }}>
      <List
        items={items}
        renderItem={renderEvent}
        onLoadMore={loadMore}
        hasMore={hasMore}
        loadingMore={loadingMore}
      />
    </Box>
  );
}
