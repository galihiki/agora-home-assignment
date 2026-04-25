import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ContactDetails from "./ContactDetails/ContactDetails";
import Location from "./Location/Location";
import Confirmation from "./Confirmation/Confirmation";
import type { WizardStep } from "types/wizard";

export const steps: WizardStep[] = [
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
