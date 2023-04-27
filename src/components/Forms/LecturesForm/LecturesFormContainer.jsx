import { useEffect } from 'react'
import StudentFormComponent from './LecturesFormComponent'
import { useSelector } from 'react-redux'
import { useMutation, useGet } from 'figbird'
import { useSearchParams } from 'react-router-dom'
import useModalNavigate from 'src/Hooks/useModalRouter'

import { notifications } from '@mantine/notifications'
import types from 'src/ModalTypes/index'

const LecturesFormContainer = () => {
  let [searchParams] = useSearchParams()
  const { close } = useModalNavigate()

  const lectureId = searchParams.get('lectureId')

  const { create, patch, error: mutationError } = useMutation(types.LECTURES)

  const { data: studentData } = useGet(types.LECTURES, lectureId, {
    skip: !lectureId,
  })

  // temp solutions userId to be real userId
  const { userId } = useSelector((state) => state.global)

  const onSubmit = async (reset, formValues) => {
    if (!lectureId) {
      await create({
        ...formValues,
        createdBy: userId,
      })

      notifications.show({
        autoClose: 1500,
        title: 'Created',
        message: 'Successfully created Lecture',
        color: 'green',
      })
    } else {
      await patch(lectureId, formValues)
      notifications.show({
        autoClose: 1500,
        title: 'Updated',
        message: 'Successfully Updated Lecture',
        color: 'green',
      })
    }

    reset({
      title: '',
      text: '',
      teaser: '',
    })
    close()
  }
  useEffect(() => {
    let err = mutationError?.message
    if (err) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [mutationError])
  return <StudentFormComponent onSubmit={onSubmit} data={studentData} />
}

export default LecturesFormContainer
