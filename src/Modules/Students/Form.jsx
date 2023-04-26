// import Input from '@components/Base/UI/Input'
import { useForm } from 'react-hook-form'
import useModalNavigate from 'src/Hooks/useModalRouter'
import Input from '@app/UI/Input/Controller'
import TextArea from '@app/UI/TextArea/Controller'
import DatePicker from '@app/UI/DatePicker/Controller'
import { IconHeading, IconFileTextAi, IconUser } from '@tabler/icons-react'

const StudentForm = ({ onSave, data, onDelete }) => {
  const { close, state, params } = useModalNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm({ ...data })

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit((vals) => onSave(reset, vals))}
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
      {/* <DatePicker
        control={control}
        name="dob"
        error={errors['dob']?.message}
        label="Day of Birth"
      /> */}
      <Input
        control={control}
        label="Day of Birth"
        name="dob"
        error={errors['lName']?.message}
        placeholder="Date of birth"
        autosize
        icon={<IconUser />}
      />
      <br />
      <button type="submit">{params?.id ? 'Update' : 'Submit'}</button>
      {state.updateId && (
        <>
          <br />
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </form>
  )
}

export default StudentForm
