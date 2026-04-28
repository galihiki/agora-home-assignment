import { TextField, Box } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import type { StepComponentProps } from "types/wizard";
import { validateStep } from "../wizardValidation";

export default function ContactDetails({
  formData,
  onChange,
}: StepComponentProps) {
  const [touched, setTouched] = useState({
    email: false,
    phone: false,
  });
  const { errors } = validateStep(2, formData);
  const emailError = touched.email ? (errors.email ?? "") : "";
  const phoneError = touched.phone ? (errors.phone ?? "") : "";

  const handleChange =
    (field: "email" | "phone") => (event: ChangeEvent<HTMLInputElement>) => {
      const nextTouched = { ...touched, [field]: true };
      onChange(event);
      if (!touched[field]) {
        setTouched(nextTouched);
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
