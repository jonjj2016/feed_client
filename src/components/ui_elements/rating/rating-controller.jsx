import { useController } from "react-hook-form";
import Rating from "./rating";
import PropTypes from "prop-types";

const RatingController = ({ name, control, ...rest }) => {
  const {
    field: { value, ...fieldProps },
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return (
    <Rating
      id={name}
      error={fieldError?.message}
      {...fieldProps}
      defaultValue={value ?? ""}
      {...rest}
    />
  );
};

RatingController.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  ...Rating.propTypes,
};

export default RatingController;
