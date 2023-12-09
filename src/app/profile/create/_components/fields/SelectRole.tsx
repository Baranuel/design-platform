import { Button, Select } from "antd"
import { Controller, useFormContext } from "react-hook-form"


export const SelectRole = () => {
    const {control, watch, reset} = useFormContext()
    const role = watch('role')
    const roleOptions = [
        {value: 'DESIGNER', label: 'Designer'},
        {value:'CLIENT', label: 'Client'}]

    return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
          <p className="flex-grow">What is your role</p>
            <Button onClick={() =>reset()}  className="w-[100px]">Reset</Button>
          </div>
            <Controller
                name="role"
                control={control}
                render={({field}) => (
                    <Select
                        {...field}
                        className="w-full"
                        options={roleOptions}
                        disabled={!!role}
                        placeholder="Select your role"
                    />
                )}
            />
        </div>
    )
}