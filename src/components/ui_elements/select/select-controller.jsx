import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import Select from "./select";
import AsyncSelect from "./async-select";

const SelectController = ({ name, isAsync, control, ...rest }) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  const Component = isAsync ? AsyncSelect : Select;

  return (
    <Component
      id={name}
      error={fieldError?.message}
      {...rest}
      {...field}
      defaultValue={field.value ?? ""}
    />
  );
};

SelectController.propTypes = {
  name: PropTypes.string.isRequired,
  isAsync: PropTypes.bool,
  control: PropTypes.object.isRequired,
};

export default SelectController;
