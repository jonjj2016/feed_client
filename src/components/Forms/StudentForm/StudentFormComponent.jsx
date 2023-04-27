// import Input from '@components/Base/UI/Input'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Flex } from '@mantine/core'
import { IconUser, IconCalendar } from '@tabler/icons-react'
import { useEffect } from 'react'
import { Button } from '@mantine/core'
import InputController from '@app/ui_elements/input/input-controller'
import DateInputController from '@app/ui_elements/date-input/date-input-controller'

const schema = yup.object().shape({
  fName: yup.string().max(32).required().label('First name'),
  lName: yup.string().max(32).required().label('Last name'),
  dob: yup.date().required().label('Date Of Birth'),
})

const StudentForm = ({ onSubmit, data }) => {
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) })

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
      <Flex direction={{ base: 'column' }} gap={{ base: 'sm', sm: 'lg' }}>
        <InputController
          name="fName"
          label={'First Name'}
          withAsterisk
          control={control}
          icon={<IconUser />}
          placeholder="Enter First Name here"
        />
        <InputController
          name="lName"
          label={'Last Name'}
          withAsterisk
          control={control}
          icon={<IconUser />}
          placeholder="Enter Last Name here"
        />
        <DateInputController
          name="dob"
          label={'Day of Birth'}
          withAsterisk
          control={control}
          icon={<IconCalendar />}
          placeholder="Select DOB"
        />

        <Button type="submit"> Submit</Button>
      </Flex>
    </form>
  )
}
StudentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
}

export default StudentForm
