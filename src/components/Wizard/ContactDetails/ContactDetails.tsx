import { TextField, Box } from "@mui/material";
import { useState, type ChangeEvent } from "react";

interface ContactDetailsProps {
  email: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactDetails({
  email,
  onChange,
}: ContactDetailsProps) {
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(event);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Email Address"
        name="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        placeholder="Enter your email"
        fullWidth
        variant="outlined"
        error={!!emailError}
        helperText={emailError}
      />
    </Box>
  );
}
