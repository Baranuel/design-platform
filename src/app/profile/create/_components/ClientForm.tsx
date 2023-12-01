'use client';

import { Select } from "antd";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form"

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

export const ClientForm = () => {
    const {control, watch} = useFormContext()
    console.log(watch())
    const [step, setStep] = useState(1)
        return (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
              <p>What is your industry?</p>
                <Controller
                    name="industry"
                    control={control}
                    render={({field}) => (
                        <Select
                            {...field}
                            className="w-full"
                            options={industryOptions}
                            placeholder="Select your industry"
                        />
                    )}
                />
              </div>
              <div className="flex flex-col gap-2">
              <p>How big is your business ?</p>
                <Controller
                    name="business_size"
                    control={control}
                    render={({field}) => (
                        <Select
                            {...field}
                            className="w-full"
                            options={[
                                {value: '1-10', label: '1-10'},
                                {value: '11-50', label: '11-50'},
                                {value: '51-200', label: '51-200'},
                                {value: '201-500', label: '201-500'},
                                {value: '501-1000', label: '501-1000'},
                                {value: '1000+', label: '1000+'},
                            ]}
                            placeholder="Select your business size"
                        />
                    )}
                />
              </div>
                <div className="flex gap-2 justify-end">
                    <button className="btn btn-primary" onClick={() => setStep(step - 1)}>Back</button>
                    <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Next</button>
                </div>
            </div> )

    


}