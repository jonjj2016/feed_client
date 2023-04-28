import { Loader } from "@mantine/core";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import Select from "./select";
import useAsyncSelect from "./use-async-select";

const AsyncSelect = forwardRef(
  (
    {
      serviceName,
      queryParams = {},
      searchQueryKey = "title",
      valueKey = "_id",
      labelKey = "title",
      renderOptionLabel,
      ...rest
    },
    ref
  ) => {
    const { selectProps, isLoading } = useAsyncSelect({
      serviceName,
      searchQueryKey,
      valueKey,
      labelKey,
      queryParams,
      renderOptionLabel,
    });

    return (
      <Select
        ref={ref}
        isMulty={false}
        className="app-select"
        searchable
        rightSection={
          isLoading ? <Loader color="cyan" variant="dots" size={16} /> : null
        }
        {...selectProps}
        {...rest}
      />
    );
  }
);

AsyncSelect.propTypes = {
  serviceName: PropTypes.string.isRequired,
  queryParams: PropTypes.object,
};

export default AsyncSelect;
