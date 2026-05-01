import type { EventItem as EventItemType } from "../eventMockData";
import { Box, Typography } from "@mui/material";

interface EventItemProps {
  event: EventItemType;
}

export default function EventItem({ event }: EventItemProps) {
  const actionText = event.action.replaceAll("_", " ");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: 1.5,
        alignItems: "center",
        py: 0.5,
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>{event.user}</Typography>
      <Typography>{actionText}</Typography>
      <Typography sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
        {new Date(event.timestamp).toLocaleString()}
      </Typography>
    </Box>
  );
}
