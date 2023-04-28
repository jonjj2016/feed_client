import { useController } from "react-hook-form";
import Input from "./textarea";
import PropTypes from "prop-types";
import Textarea from "./textarea";

const TextareaController = ({ name, control, ...rest }) => {
  const {
    field:{value,...fieldProps},
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return <Textarea id={name} error={fieldError?.message} {...rest} {...fieldProps} defaultValue={value ?? ""}  />;
};

TextareaController.propTypes = {
  name:PropTypes.string.isRequired,
  control:PropTypes.object.isRequired,
  ...Input.propTypes
}


export default TextareaController;