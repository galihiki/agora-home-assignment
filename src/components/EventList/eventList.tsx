import List from "../GenericComponents/List";
import { eventMockData, type EventItem } from "./eventMockData";
import "./eventList.scss";
import EventItemComponent from "./EventItem/EventItem";

export default function EventList() {
  const renderEvent = (event: EventItem) => <EventItemComponent event={event} />;

  return (
    <div className="event-list-container">
      <List items={eventMockData.events} renderItem={renderEvent} />
    </div>
  );
}
