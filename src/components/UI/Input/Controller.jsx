import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import FormInput from './Component'

const ControlledFormInput = forwardRef(
  (
    {
      control,
      name,

      error,
      element,
      defaultValue,
      placeholder,
      className = '',
      children,
      rules,
      ...rest
    },
    ref,
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, formState }) => {
          return (
            <>
              <FormInput
                rules={rules}
                error={error}
                placeholder={placeholder}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={defaultValue || field.value}
                ref={ref}
                {...formState}
                {...field}
                {...rest}
              />
              {/* {error && <div>{error}</div>} */}
            </>
          )
        }}
      />
    )
  },
)

ControlledFormInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.object,
  control: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default ControlledFormInput
