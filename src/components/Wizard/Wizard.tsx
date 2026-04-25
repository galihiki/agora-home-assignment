import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import type { FormData, WizardChangeEvent } from "types/wizard";
import { steps } from "./steps";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
    },
    secondary: {
      main: "#764ba2",
    },
  },
});

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  agree: false,
};

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [stepErrors, setStepErrors] = useState<Record<number, boolean>>({});

  const handleStepError = (stepId: number, hasError: boolean) => {
    setStepErrors((prev) => ({ ...prev, [stepId]: hasError }));
  };

  const handleInputChange = (event: WizardChangeEvent) => {
    const { name, value } = event.target;
    const type = "type" in event.target ? event.target.type : undefined;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (event.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    alert(
      `Wizard completed!\n\nData submitted:\n${JSON.stringify(formData, null, 2)}`,
    );
    // Reset form
    setCurrentStep(0);
    setFormData(initialFormData);
  };

  const renderStepContent = () => {
    const StepComponent = steps[currentStep]?.component;

    if (!StepComponent) return null;

    return (
      <StepComponent
        formData={formData}
        onChange={handleInputChange}
        onErrorChange={(hasError: boolean) =>
          handleStepError(steps[currentStep].id, hasError)
        }
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: 2,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            maxWidth: 600,
            width: "100%",
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Multi-Step Wizard
          </Typography>

          <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
            {steps.map((step) => (
              <Step key={step.id}>
                <StepLabel error={!!stepErrors[step.id]}>
                  {step.title}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mb: 4, minHeight: 200 }}>
            <Typography variant="h6" gutterBottom>
              {steps[currentStep].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {steps[currentStep].description}
            </Typography>
            {renderStepContent()}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleComplete}
                disabled={!formData.agree}
              >
                Complete
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
