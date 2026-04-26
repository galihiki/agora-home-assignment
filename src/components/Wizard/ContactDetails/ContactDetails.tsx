import { TextField, Box } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import type { StepComponentProps } from "types/wizard";

export default function ContactDetails({
  formData,
  onChange,
  onErrorChange,
}: StepComponentProps) {
  const [touched, setTouched] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getEmailError = () => {
    if (!touched) return "";
    if (!formData.email) {
      return "Email is mandatory";
    }
    if (!validateEmail(formData.email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const emailError = getEmailError();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    onErrorChange(!!getEmailError());
  };

  const handleEmailBlur = () => {
    setTouched(true);
  };

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
