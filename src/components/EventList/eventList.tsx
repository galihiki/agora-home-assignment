import List from "../GenericComponents/List";
import { eventMockData, type EventItem } from "./eventMockData";
import "./eventList.scss";

export default function EventList() {
  const formatEvent = (event: EventItem): string => {
    const date = new Date(event.timestamp).toLocaleString();
    return `${event.id} | ${event.user} | ${event.action} | ${date}`;
  };

  return (
    <div className="event-list-container">
      <List items={eventMockData.events} renderItem={formatEvent} />
    </div>
  );
}
