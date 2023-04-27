// import Input from '@components/Base/UI/Input'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { IconAB2, IconFileTextAi, IconHeading } from '@tabler/icons-react'
import InputController from '@app/ui_elements/input/input-controller'
import { useEffect } from 'react'
import { Button } from '@mantine/core'

const LecturesForm = ({ onSubmit, data }) => {
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
      <InputController
        name="title"
        label={'Title'}
        withAsterisk
        control={control}
        icon={<IconHeading />}
        placeholder="Type title here"
      />
      <InputController
        name="text"
        label={'Text'}
        withAsterisk
        control={control}
        icon={<IconFileTextAi />}
        placeholder="Type text here"
      />
      <InputController
        name="teaser"
        label={'Teaser'}
        withAsterisk
        control={control}
        icon={<IconAB2 />}
        placeholder="Type teaser here"
      />
      <br />
      <Button type="submit">Submit</Button>
    </form>
  )
}
LecturesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
}

export default LecturesForm
