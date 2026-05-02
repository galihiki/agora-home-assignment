export interface EventItem {
  id: string;
  user: string;
  action: string;
  timestamp: number;
}

export const EVENT_USERS = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "George",
  "Hana",
] as const;

export const EVENT_ACTIONS = [
  "uploaded_file",
  "downloaded_file",
  "deleted_file",
  "shared_file",
  "updated_profile",
] as const;

const users = EVENT_USERS;
const actions = EVENT_ACTIONS;

const baseTimestamp = 1710000000000;

export const eventMockData: { events: EventItem[] } = {
  events: Array.from({ length: 500 }, (_, index) => ({
    id: String(index + 1),
    user: users[index % users.length],
    action: actions[index % actions.length],
    timestamp: baseTimestamp + index * 60_000,
  })),
};
