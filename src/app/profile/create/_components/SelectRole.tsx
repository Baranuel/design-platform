import { Select } from "antd"
import { Controller, useFormContext } from "react-hook-form"


export const SelectRole = () => {
    const {control} = useFormContext()
    const roleOptions = [
        {value: 'designer', label: 'Designer'},
        {value:'client', label: 'Client'}]
    return (
        <div className="flex flex-col gap-2">
            <p>What is your role</p>
            <Controller
                name="role"
                control={control}
                render={({field}) => (
                    <Select
                        {...field}
                        className="w-full"
                        options={roleOptions}
                        placeholder="Select your role"
                    />
                )}
            />
        </div>
    )
}