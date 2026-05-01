import type { EventItem as EventItemType } from "../eventMockData";
import "./EventItem.scss";

interface EventItemProps {
  event: EventItemType;
}

export default function EventItem({ event }: EventItemProps) {
  return (
    <div className="event-item">
      <span className="event-item-user">{event.user}</span>
      <span className="event-item-action">{event.action}</span>
      <span className="event-item-time">
        {new Date(event.timestamp).toLocaleString()}
      </span>
    </div>
  );
}
