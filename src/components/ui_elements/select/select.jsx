import { Select as MantineSelect, MultiSelect } from "@mantine/core";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Select = forwardRef(({ data = [], isMulty, ...rest }, ref) => {
  const Component = isMulty ? MultiSelect : MantineSelect;

  return (
    <Component
      nothingFound="Nothing found"
      className="app-select"
      data={data}
      {...rest}
      ref={ref}
    />
  );
});

Select.propTypes = {
  ...MantineSelect.propTypes,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  isMulty: PropTypes.bool,
};

export default Select;
