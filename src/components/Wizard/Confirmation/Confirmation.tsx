import {
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import type { ChangeEvent } from "react";
import type { StepComponentProps } from "types/wizard";

export default function Confirmation({
  formData,
  onChange,
}: StepComponentProps) {
  const handleAgreeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            First Name:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            {formData.firstName || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Last Name:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            {formData.lastName || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Email:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            {formData.email || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Phone:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            {formData.phone || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Country:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            {formData.country || "Not provided"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agree}
            onChange={handleAgreeChange}
            name="agree"
            color="primary"
          />
        }
        label="I confirm all information is correct"
      />
    </Box>
  );
}
