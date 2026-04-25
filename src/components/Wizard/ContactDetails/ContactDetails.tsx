import { TextField, Box } from "@mui/material";
import { useState, useEffect, type ChangeEvent } from "react";
import type { StepComponentProps } from "types/wizard";

export default function ContactDetails({
  formData,
  onChange,
  onErrorChange,
}: StepComponentProps) {
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
    if (!formData.email) {
      setEmailError("Email is mandatory");
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
    }
  };

  useEffect(() => {
    const hasError = !formData.email || !!emailError;
    onErrorChange(hasError);
  }, [formData.email, emailError, onErrorChange]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
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
