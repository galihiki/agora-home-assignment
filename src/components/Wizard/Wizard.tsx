import { useState, type ChangeEvent, type ComponentType } from "react";
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
import { type SelectChangeEvent } from "@mui/material/Select";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ContactDetails from "./ContactDetails/ContactDetails";
import Location from "./Location/Location";
import Confirmation from "./Confirmation/Confirmation";

interface WizardStep {
  id: number;
  title: string;
  description: string;
  component: ComponentType<any>;
}

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

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    agree: false,
  });

  const steps: WizardStep[] = [
    {
      id: 1,
      title: "Personal Information",
      description: "Enter your basic details",
      component: PersonalInfo,
    },
    {
      id: 2,
      title: "Contact Details",
      description: "Provide your contact information",
      component: ContactDetails,
    },
    {
      id: 3,
      title: "Location",
      description: "Select your country",
      component: Location,
    },
    {
      id: 4,
      title: "Confirmation",
      description: "Review and confirm your information",
      component: Confirmation,
    },
  ];

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | SelectChangeEvent<string>,
  ) => {
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
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      agree: false,
    });
  };

  const renderStepContent = () => {
    const StepComponent = steps[currentStep].component;

    switch (currentStep) {
      case 0:
        return (
          <StepComponent
            firstName={formData.firstName}
            lastName={formData.lastName}
            onChange={handleInputChange}
          />
        );
      case 1:
        return (
          <StepComponent email={formData.email} onChange={handleInputChange} />
        );
      case 2:
        return (
          <StepComponent
            country={formData.country}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <StepComponent
            firstName={formData.firstName}
            lastName={formData.lastName}
            email={formData.email}
            country={formData.country}
            agree={formData.agree}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
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
                <StepLabel>{step.title}</StepLabel>
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
