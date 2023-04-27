// import Input from '@components/Base/UI/Input'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import Input from 'src/components/UI/Input/Controller'
import { IconHeading } from '@tabler/icons-react'
import TextArea from 'src/components/UI/TextArea/Controller'
import { useEffect } from 'react'
import { Button } from '@mantine/core'

const CurriculaForm = ({ onSubmit, data }) => {
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
        label="Title"
        name="title"
        error={errors['title']?.message}
        rules={{ required: 'Title is required' }}
        placeholder="Enter Title here"
        // description="Type your curricula title"
        icon={<IconHeading />}
      />
      <br />

      <TextArea
        control={control}
        name="text"
        error={errors['text']?.message}
        rules={{ required: 'Text is required' }}
        placeholder="Text"
        label="Text"
        autosize
        minRows={3}
      />
      <br />
      <TextArea
        control={control}
        name="teaser"
        error={errors['teaser']?.message}
        rules={{ required: 'Teaser is required' }}
        placeholder="Type teaser here"
        label="Teaser"
        autosize
        minRows={3}
      />
      <br />
      <Button type="submit"> Submit</Button>
    </form>
  )
}
CurriculaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
}

export default CurriculaForm
