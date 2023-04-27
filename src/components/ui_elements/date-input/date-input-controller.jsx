import { useController } from "react-hook-form";
import DateInput from "./date-input";
import PropTypes from "prop-types";

const DateInputController = ({ name, control, ...rest }) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return <DateInput id={name} error={fieldError?.message} {...rest} {...field}  />;
};

DateInputController.propTypes = {
  name:PropTypes.string.isRequired,
  control:PropTypes.object.isRequired,
  ...DateInput.propTypes
}

export default DateInputController;