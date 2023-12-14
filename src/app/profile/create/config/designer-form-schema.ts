
import { FormProps } from "../types";
import options from "./countriesOptions"

const currentStatusOptions = [
    {
      label: "Employed",
      value: "employed",
    },
    {
        label: "Freelancer",
        value: "freelancer",
    },
    {
      label: "Part-time",
      value: "part-time",
    },
    {
      label: "Student",
      value: "student",
    },
    {
      label: "Unemployed",
      value: "unemployed",
    },
]

export const designerFormSchema: FormProps = {
    "step-1": {
      category: "Address information",
      description: "Please provide address information and  the location of your business",
      fields: [
        {
          name: "country",
          type: "select",
          placeholder: "Select your country",
          label: "Country",
          options: options,
        },
        {
          name: "postalCode",
          type: "text",
          placeholder: "Postal code",
          label: "Postal code",
        },
      ],
    },
    "step-2": {
      category: "Experience",
      description: "Please provide about your experience in design",
      fields: [
        {
          name: "university",
          type: "text",
          placeholder: "Attended University",
          label: "Attended University",
        },
        {
          name: "yearsOfExperience",
          type: "text",
          placeholder: "Years of experience",
          label: "Years of experience",
        },
        {
          name: "portfolio",
          type: "text",
          placeholder: "Link to your portfolio",
          label: "Link to your portfolio",
        },
      ],
    },
    "step-3": {
      category: "Finishing up",
      fields: [
        {
          name: "message",
          type: "read-only",
        message:[`Thank you for taking your time filling in all the relevant information.
        We are now set and ready to finish your profile.`,  `After submitting this form you will be redirected to your profile page where you can apply for redesign of your current website.`]
        },
      
      ],
    },
  };