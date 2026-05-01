export interface EventItem {
  id: string;
  user: string;
  action: string;
  timestamp: number;
}

const users = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "George",
  "Hana",
];

const actions = [
  "uploaded_file",
  "downloaded_file",
  "deleted_file",
  "shared_file",
  "updated_profile",
];

const baseTimestamp = 1710000000000;

export const eventMockData: { events: EventItem[] } = {
  events: Array.from({ length: 500 }, (_, index) => ({
    id: String(index + 1),
    user: users[index % users.length],
    action: actions[index % actions.length],
    timestamp: baseTimestamp + index * 60_000,
  })),
};
