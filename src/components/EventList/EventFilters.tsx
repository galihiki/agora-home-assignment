import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { EVENT_ACTIONS, EVENT_USERS } from "./eventMockData";

export interface EventFiltersProps {
  userFilter: string;
  actionFilter: string;
  onUserFilterChange: (value: string) => void;
  onActionFilterChange: (value: string) => void;
}

const formatActionLabel = (action: string) => action.replaceAll("_", " ");

export default function EventFilters({
  userFilter,
  actionFilter,
  onUserFilterChange,
  onActionFilterChange,
}: EventFiltersProps) {
  const handleUserChange = (event: SelectChangeEvent<string>) => {
    onUserFilterChange(event.target.value);
  };

  const handleActionChange = (event: SelectChangeEvent<string>) => {
    onActionFilterChange(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
      }}
    >
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="event-filter-user-label">User</InputLabel>
        <Select
          labelId="event-filter-user-label"
          label="User"
          value={userFilter}
          onChange={handleUserChange}
        >
          <MenuItem value="">
            <em>All users</em>
          </MenuItem>
          {EVENT_USERS.map((user) => (
            <MenuItem key={user} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="event-filter-action-label">Action</InputLabel>
        <Select
          labelId="event-filter-action-label"
          label="Action"
          value={actionFilter}
          onChange={handleActionChange}
        >
          <MenuItem value="">
            <em>All actions</em>
          </MenuItem>
          {EVENT_ACTIONS.map((action) => (
            <MenuItem key={action} value={action}>
              {formatActionLabel(action)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
