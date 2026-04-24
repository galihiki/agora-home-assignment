// columns

import { Badge, Button, HStack } from "@chakra-ui/react";

export const columns = [
  {
    name: "Vendor Name",
    id: "vendorName",
    size: "m",
    cellContent: (item: Item) => item.vendorName,
  },
  {
    name: "Status",
    id: "status",
    size: "s",
    cellContent: (item: Item) => (
      <Badge colorScheme={badgeColorSchemeByStatus[item.status]}>
        {item.status}
      </Badge>
    ),
  },
  {
    name: "Created At",
    id: "createdAt",
    size: "s",
    cellContent: (item: Item) => item.createdAt,
  },
  {
    name: "Bill Amount",
    id: "billAmount",
    size: "s",
    cellContent: (item: Item) => `$${item.billAmount.toFixed(2)}`,
  },
  {
    name: "Actions",
    id: "actions",
    size: "m",
    cellContent: () => (
      <HStack>
        <Button colorScheme="purple" variant="ghost">
          Edit
        </Button>
        <Button colorScheme="red" variant="ghost">
          Delete
        </Button>
      </HStack>
    ),
  },
];

type Item = {
  vendorName: string;
  status: "Inactive" | "Active" | "Pending";
  createdAt: string;
  billAmount: number;
};

const badgeColorSchemeByStatus: Record<Item["status"], string> = {
  Inactive: "red",
  Active: "green",
  Pending: "yellow",
};
