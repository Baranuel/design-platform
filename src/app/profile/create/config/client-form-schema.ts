
import { FormProps } from "../types";
import options from "./countriesOptions"

const industryOptions = [
    { value : 'software and internet', label: 'Software and Internet' },
    { value: 'media and entertainment', label: 'Media and Entertainment'},
    { value: 'technology and communications', label: 'Technology and Communications' },
    { value: 'healthcare and pharmaceuticals', label: 'Healthcare and Pharmaceuticals' },
    { value: 'finance and insurance', label: 'Finance and Insurance' },
    { value: 'manufacturing and construction', label: 'Manufacturing and Construction' },
    { value: 'retail and consumer services', label: 'Retail and Consumer Services' },
    { value: 'energy and utilities', label: 'Energy and Utilities' },
    { value: 'transportation and logistics', label: 'Transportation and Logistics' },
    { value: 'education and training', label: 'Education and Training' },
    { value: 'hospitality and tourism', label: 'Hospitality and Tourism' },
    { value: 'agriculture and food production', label: 'Agriculture and Food Production' }
  ];

  const companySizeOptions = [
    {value: '1-10', label: '1-10'},
    {value: '11-50', label: '11-50'},
    {value: '51-200', label: '51-200'},
    {value: '201-500', label: '201-500'},
    {value: '501-1000', label: '501-1000'},
    {value: '1000+', label: '1000+'},
]


export const clientFormSchema: FormProps = {
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
      category: "Business information",
      description: "Please provide your business information",
      fields: [
        {
          name: "companyName",
          type: "text",
          placeholder: "Company name",
          label: "Company name",
        },
        {
          name: "companyDescription",
          type: "textarea",
          placeholder: "Company Description",
          label: "Company Description",
        },
        {
          name: "companyIndustry",
          type: "select-multi",
          placeholder: "Industry",
          label: "Industry",
          options: industryOptions
        },
        {
          name: "companySize",
          type: "select",
          placeholder: "Company Size",
          label: "Company Size",
          options: companySizeOptions
        },
        {
          name: "companyRegistration",
          type: "text",
          placeholder: "Company Registration Number",
          label: "Company Registration Number",
        },
        {
          name: "companyWebsite",
          type: "url",
          placeholder: "Company Website",
          label: "Company Website",
        }
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