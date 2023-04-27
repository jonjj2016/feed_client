// import Input from '@components/Base/UI/Input'
import { useForm } from 'react-hook-form'
import useModalNavigate from 'src/Hooks/useModalRouter'
import Input from 'src/components/UI/Input/Controller'
import TextArea from 'src/components/UI/TextArea/Controller'
import { IconHeading } from '@tabler/icons-react'

const CurriculumForm = ({ onSave, data, onDelete }) => {
  const { close, state, params } = useModalNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm({ ...data })
  //   useEffect(() => {
  //     if (data?._id) {
  //       Object.keys(data).forEach((key) => {
  //         setValue(key, data[key])
  //       })
  //     }
  //   }, [data])

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit((vals) => onSave(reset, vals))}
    >
      <Input
        control={control}
        label="Title"
        name="title"
        error={errors['title']?.message}
        rules={{ required: 'Title is required' }}
        placeholder="Enter Title here"
        // description="Type your curricula title"
        register={register}
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
        register={register}
        autosize
        minRows={3}
        // icon={<IconFileTextAi />}
      />
      <br />
      <TextArea
        control={control}
        name="teaser"
        error={errors['teaser']?.message}
        rules={{ required: 'Teaser is required' }}
        placeholder="Type teaser here"
        label="Teaser"
        register={register}
        autosize
        minRows={3}
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

export default CurriculumForm
