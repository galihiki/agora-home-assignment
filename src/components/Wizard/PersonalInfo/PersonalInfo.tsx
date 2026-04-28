import { TextField, Box } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import type { StepComponentProps } from "types/wizard";
import { validateStep } from "../wizardValidation";

export default function PersonalInfo({
  formData,
  onChange,
}: StepComponentProps) {
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
  });
  const { errors } = validateStep(1, formData);
  const firstNameError = touched.firstName ? (errors.firstName ?? "") : "";
  const lastNameError = touched.lastName ? (errors.lastName ?? "") : "";

  const handleChange =
    (field: "firstName" | "lastName") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextTouched = { ...touched, [field]: true };
      onChange(event);
      if (!touched[field]) {
        setTouched(nextTouched);
      }
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange("firstName")}
        placeholder="Enter your first name"
        fullWidth
        variant="outlined"
        error={!!firstNameError}
        helperText={firstNameError}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange("lastName")}
        placeholder="Enter your last name"
        fullWidth
        variant="outlined"
        error={!!lastNameError}
        helperText={lastNameError}
      />
    </Box>
  );
}
