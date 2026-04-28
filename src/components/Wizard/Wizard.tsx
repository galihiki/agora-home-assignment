import { useEffect, useState } from "react";
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
import { validateStep } from "./wizardValidation";

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
  phone: "",
  country: "",
  agree: false,
};
const FORM_DATA_STORAGE_KEY = "wizardFormData";

const isFormData = (value: unknown): value is FormData => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as Record<string, unknown>;
  return (
    typeof data.firstName === "string" &&
    typeof data.lastName === "string" &&
    typeof data.email === "string" &&
    typeof data.phone === "string" &&
    typeof data.country === "string" &&
    typeof data.agree === "boolean"
  );
};

const getInitialFormData = (): FormData => {
  const savedFormData = localStorage.getItem(FORM_DATA_STORAGE_KEY);
  if (!savedFormData) {
    return initialFormData;
  }

  try {
    const parsedData: unknown = JSON.parse(savedFormData);
    if (isFormData(parsedData)) {
      return parsedData;
    }
  } catch {
    localStorage.removeItem(FORM_DATA_STORAGE_KEY);
  }

  return initialFormData;
};

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(() => getInitialFormData());
  const [stepInteracted, setStepInteracted] = useState<Record<number, boolean>>(
    steps.reduce((acc, step) => ({ ...acc, [step.id]: false }), {}),
  );

  useEffect(() => {
    localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (event: WizardChangeEvent) => {
    const { name, value } = event.target;
    const type = "type" in event.target ? event.target.type : undefined;
    const currentStepId = steps[currentStep].id;

    setStepInteracted((prev) => {
      if (prev[currentStepId]) {
        return prev;
      }
      return { ...prev, [currentStepId]: true };
    });

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
    setStepInteracted(steps.reduce((acc, step) => ({ ...acc, [step.id]: false }), {}));
  };

  const renderStepContent = () => {
    const StepComponent = steps[currentStep]?.component;

    if (!StepComponent) return null;

    return (
      <StepComponent
        formData={formData}
        onChange={handleInputChange}
      />
    );
  };

  const currentStepId = steps[currentStep].id;
  const isCurrentStepValid = validateStep(currentStepId, formData).isValid;

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
                <StepLabel
                  error={
                    !!stepInteracted[step.id] && !validateStep(step.id, formData).isValid
                  }
                >
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
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isCurrentStepValid}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
