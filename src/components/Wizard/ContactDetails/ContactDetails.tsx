import { TextField, Box } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import type { StepComponentProps } from "types/wizard";

export default function ContactDetails({
  formData,
  onChange,
  onErrorChange,
}: StepComponentProps) {
  const [touched, setTouched] = useState({
    email: false,
    phone: false,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  };

  const getEmailError = (email = formData.email, touchedState = touched) => {
    if (!touchedState.email) return "";
    if (!email) {
      return "Email is mandatory";
    }
    if (!validateEmail(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const getPhoneError = (phone = formData.phone, touchedState = touched) => {
    if (!touchedState.phone) return "";
    if (!phone) {
      return "Phone number is mandatory";
    }
    if (!validatePhone(phone)) {
      return "Phone number must be 7-15 digits and may start with +";
    }
    return "";
  };

  const emailError = getEmailError();
  const phoneError = getPhoneError();

  const reportErrors = (
    email = formData.email,
    phone = formData.phone,
    touchedState = touched
  ) => {
    const emailErrorMessage = getEmailError(email, touchedState);
    const phoneErrorMessage = getPhoneError(phone, touchedState);
    onErrorChange(!!emailErrorMessage || !!phoneErrorMessage);
  };

  const handleChange =
    (field: "email" | "phone") => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const nextTouched = { ...touched, [field]: true };
      onChange(event);
      if (!touched[field]) {
        setTouched(nextTouched);
      }
      if (field === "email") {
        reportErrors(value, formData.phone, nextTouched);
      } else {
        reportErrors(formData.email, value, nextTouched);
      }
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        placeholder="Enter your email"
        fullWidth
        variant="outlined"
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange("phone")}
        placeholder="Enter your phone number"
        fullWidth
        variant="outlined"
        error={!!phoneError}
        helperText={phoneError}
      />
    </Box>
  );
}
