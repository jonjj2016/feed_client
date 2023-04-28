import { DatePickerInput } from '@mantine/dates';
import { forwardRef } from "react";

const DateInput = forwardRef(({...rest}, ref) => {
    return <DatePickerInput dropdownType="modal" className="app-dateinput" {...rest} ref={ref}/>
});

DateInput.propTypes = {
    ...DatePickerInput.propTypes
}

export default DateInput;
