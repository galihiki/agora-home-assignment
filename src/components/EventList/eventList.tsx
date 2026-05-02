import List from "../GenericComponents/List";
import { eventMockData, type EventItem } from "./eventMockData";
import EventItemComponent from "./EventItem/EventItem";
import { Box } from "@mui/material";

export default function EventList() {
  const renderEvent = (event: EventItem) => <EventItemComponent event={event} />;

  return (
    <Box sx={{ height: "100%", width: "100%", overflowY: "hidden", p: 2 }}>
      <List
        items={eventMockData.events}
        renderItem={renderEvent}
        initialItemsToShow={20}
        itemsPerScrollLoad={10}
      />
    </Box>
  );
}
