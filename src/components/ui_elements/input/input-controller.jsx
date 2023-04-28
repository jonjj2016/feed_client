import { useController } from "react-hook-form";
import Input from "./Input";
import PropTypes from "prop-types";

const InputController = ({ name, control, ...rest }) => {
  const {
    field:{value,...fieldProps},
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return <Input id={name} error={fieldError?.message} {...rest} {...fieldProps} defaultValue={value ?? ""}  />;
};

InputController.propTypes = {
  name:PropTypes.string.isRequired,
  control:PropTypes.object.isRequired,
  ...Input.propTypes
}


export default InputController;