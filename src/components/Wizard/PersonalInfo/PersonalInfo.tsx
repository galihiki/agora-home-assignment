import { TextField, Box } from "@mui/material";
import { type ChangeEvent } from "react";

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonalInfo({
  firstName,
  lastName,
  onChange,
}: PersonalInfoProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={onChange}
        placeholder="Enter your first name"
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={onChange}
        placeholder="Enter your last name"
        fullWidth
        variant="outlined"
      />
    </Box>
  );
}
