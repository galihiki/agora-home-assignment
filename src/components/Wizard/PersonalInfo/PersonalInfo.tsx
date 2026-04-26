import { TextField, Box } from "@mui/material";
import { useState, type ChangeEvent, type FocusEvent } from "react";
import type { StepComponentProps } from "types/wizard";

export default function PersonalInfo({
  formData,
  onChange,
  onErrorChange,
}: StepComponentProps) {
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
  });

  const validateName = (name: string): string => {
    if (!name || name.trim() === "") {
      return "Field is mandatory";
    }
    if (name.trim().length < 2) {
      return "Must be at least 2 characters";
    }
    return "";
  };

  const getFieldError = (
    field: "firstName" | "lastName",
    value = formData[field],
  ) => {
    if (!touched[field]) return "";
    return validateName(value);
  };

  const firstNameError = getFieldError("firstName");
  const lastNameError = getFieldError("lastName");

  const reportErrors = (
    firstName = formData.firstName,
    lastName = formData.lastName,
  ) => {
    const firstError = getFieldError("firstName", firstName);
    const lastError = getFieldError("lastName", lastName);
    onErrorChange(!!firstError || !!lastError);
  };

  const handleChange =
    (field: "firstName" | "lastName") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onChange(event);
      if (touched[field]) {
        if (field === "firstName") {
          reportErrors(value, formData.lastName);
        } else {
          reportErrors(formData.firstName, value);
        }
      }
    };

  const handleBlur =
    (field: "firstName" | "lastName") =>
    (event: FocusEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (field === "firstName") {
        reportErrors(value, formData.lastName);
      } else {
        reportErrors(formData.firstName, value);
      }
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange("firstName")}
        onBlur={handleBlur("firstName")}
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
        onBlur={handleBlur("lastName")}
        placeholder="Enter your last name"
        fullWidth
        variant="outlined"
        error={!!lastNameError}
        helperText={lastNameError}
      />
    </Box>
  );
}
