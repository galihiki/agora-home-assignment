import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import List from "../GenericComponents/List";
import { eventMockData, type EventItem } from "./eventMockData";
import EventItemComponent from "./EventItem/EventItem";
import EventFilters from "./EventFilters";
import { Box, CircularProgress } from "@mui/material";

const ALL_EVENTS = eventMockData.events;
const INITIAL_COUNT = 20;
const SCROLL_PAGE_SIZE = 10;
const INITIAL_FETCH_DELAY_MS = 600;
const LOAD_MORE_DELAY_MS = 400;

function filterEvents(events: EventItem[], userFilter: string, actionFilter: string) {
  return events.filter((event) => {
    const userOk = !userFilter || event.user === userFilter;
    const actionOk = !actionFilter || event.action === actionFilter;
    return userOk && actionOk;
  });
}

export default function EventList() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [listLoading, setListLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  const filteredAllEvents = useMemo(
    () => filterEvents(ALL_EVENTS, userFilter, actionFilter),
    [userFilter, actionFilter],
  );

  const filteredTotalRef = useRef(0);
  filteredTotalRef.current = filteredAllEvents.length;

  useEffect(() => {
    let cancelled = false;

    const fetchFirstPage = async () => {
      setListLoading(true);
      await new Promise((resolve) => setTimeout(resolve, INITIAL_FETCH_DELAY_MS));
      if (cancelled) return;
      setLoadedCount(Math.min(INITIAL_COUNT, filteredAllEvents.length));
      setListLoading(false);
    };

    void fetchFirstPage();

    return () => {
      cancelled = true;
    };
  }, [userFilter, actionFilter, filteredAllEvents]);

  const loadMore = useCallback(async () => {
    setLoadingMore(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, LOAD_MORE_DELAY_MS));
      setLoadedCount((prev) =>
        Math.min(prev + SCROLL_PAGE_SIZE, filteredTotalRef.current),
      );
    } finally {
      setLoadingMore(false);
    }
  }, []);

  const displayedItems = filteredAllEvents.slice(0, loadedCount);
  const hasMore = loadedCount < filteredAllEvents.length;

  const renderEvent = (event: EventItem) => <EventItemComponent event={event} />;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "hidden",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <EventFilters
        userFilter={userFilter}
        actionFilter={actionFilter}
        onUserFilterChange={setUserFilter}
        onActionFilterChange={setActionFilter}
      />
      <Box sx={{ flex: 1, minHeight: 0, position: "relative" }}>
        {listLoading ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <List
            items={displayedItems}
            renderItem={renderEvent}
            onLoadMore={loadMore}
            hasMore={hasMore}
            loadingMore={loadingMore}
          />
        )}
      </Box>
    </Box>
  );
}
