// import Input from '@components/Base/UI/Input'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import Input from 'src/components/UI/Input/Controller'
import DatePicker from 'src/components/UI/DatePicker/Controller'
import { IconUser } from '@tabler/icons-react'
import { useEffect } from 'react'
import { Button } from '@mantine/core'

const StudentForm = ({ onSubmit, data }) => {
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm({})

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key) => {
        setValue(key, data[key])
      })
    }
  }, [data])

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit((vals) => onSubmit(reset, vals))}
    >
      <Input
        control={control}
        label="First Name"
        name="fName"
        error={errors['fName']?.message}
        rules={{ required: 'First Name is required' }}
        placeholder="Enter First here"
        icon={<IconUser />}
      />
      <br />

      <Input
        control={control}
        label="Last Name"
        name="lName"
        error={errors['lName']?.message}
        rules={{ required: 'Last Name is required' }}
        placeholder="Last name here"
        autosize
        icon={<IconUser />}
      />
      <br />
      <DatePicker
        control={control}
        name="dob"
        error={errors['dob']?.message}
        label="Day of Birth"
      />

      <br />
      <Button type="submit"> Submit</Button>
    </form>
  )
}
StudentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
}

export default StudentForm
