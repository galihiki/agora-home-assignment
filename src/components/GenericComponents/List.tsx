import type { ReactNode } from "react";
import { Box, List as MuiList, ListItem } from "@mui/material";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

export default function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <Box sx={{ height: "100%", width: "100%", overflowY: "scroll" }}>
      <MuiList sx={{ m: 0, pl: 0, listStyleType: "none" }}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            sx={{ display: "block", p: 0, mb: 1 }}
          >
            {renderItem(item, index)}
          </ListItem>
        ))}
      </MuiList>
    </Box>
  );
}
