// import Input from '@components/Base/UI/Input'
import { useForm } from 'react-hook-form'
import { useMutation, useGet } from 'figbird'
import { useState, useEffect } from 'react'
import constants from 'src/Constants/index'
import useModalNavigate from 'src/Hooks/useModalRouter'
import { useSelector } from 'react-redux'
import Input from '@app/UI/Input/Controller'
import { IconAB2, IconFileTextAi, IconHeading } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

const LecturesForm = () => {
  const { close, state } = useModalNavigate()
  const { create, patch, error: mutationError } = useMutation(
    constants.LECTURES,
  )
  const { data, error: lectureGetError } = useGet(
    constants.LECTURES,
    state.updateId,
  )

  const { userId } = useSelector((state) => state.global)
  useEffect(() => {
    let err = lectureGetError?.message || mutationError?.message
    if (err) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [lectureGetError, mutationError])
  const onSubmit = async (data) => {
    let message = ''
    if (!state.updateId) {
    } else {
      await patch(state.updateId, data, { new: true })

      message = 'Updated Successfully'
    }
    await create({ ...data, createdBy: userId })
    notifications.show({
      title: 'Success',
      color: 'green',
      message,
    })
    close()
  }

  const onDelete = async (data) => {
    if (state.updateId) {
      await patch(state.updateId, { isDeleted: true }, { new: true })
      close()
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({ defaultValues: { ...data } })
  useEffect(() => {
    if (data?._id) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key])
      })
    }
  }, [data])

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        control={control}
        label="Title"
        name="title"
        error={errors['title']?.message}
        rules={{ required: 'First Name is required' }}
        placeholder="Enter Title here"
        // description="Type your curricula title"
        register={register}
        icon={<IconHeading />}
      />
      <br />

      <Input
        control={control}
        name="text"
        error={errors['text']?.message}
        rules={{ required: 'Text is required' }}
        placeholder="Text"
        label="Text"
        icon={<IconFileTextAi />}
      />
      <br />
      <Input
        control={control}
        name="teaser"
        error={errors['text']?.message}
        rules={{ required: 'Teaser is required' }}
        placeholder="Type teaser here"
        label="Teaser"
        register={register}
        icon={<IconAB2 />}
      />
      <br />
      <button type="submit">{state.updateId ? 'Update' : 'Submit'}</button>
      {state.updateId && (
        <>
          <br />
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </form>
  )
}

export default LecturesForm
