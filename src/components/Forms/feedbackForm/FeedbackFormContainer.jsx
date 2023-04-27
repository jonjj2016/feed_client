import { useEffect } from 'react'
import FeedBackFormComponent from './FeedbackFormComponent'
import { useSelector } from 'react-redux'
import { useMutation, useGet, useFind } from 'figbird'
import { useSearchParams } from 'react-router-dom'
import useModalNavigate from 'src/Hooks/useModalRouter'

import { notifications } from '@mantine/notifications'
import types from 'src/ModalTypes/index'

const LecturesFormContainer = () => {
  let [searchParams] = useSearchParams()
  const { close } = useModalNavigate()

  const feedBackId = searchParams.get('feedBackId')
  const studentId = searchParams.get('studentId')
  const { create, patch, error: mutationError } = useMutation(types.FEEDBACKS)
  const { data: lectures, getLectureError } = useFind(types.LECTURES, {
    query: { $sort: '-createdAt' },
  })
  const { data: feedBackData } = useGet(types.FEEDBACKS, feedBackId, {
    skip: !feedBackId,
  })

  // temp solutions userId to be real userId
  const { userId } = useSelector((state) => state.global)

  const onSubmit = async (reset, formValues) => {
    if (!feedBackId) {
      const data = { ...formValues, student: studentId, instructorId: userId }
      await create(data)

      notifications.show({
        title: 'Success',
        color: 'green',
        message: 'Added FeedBack',
      })
    } else {
      await patch(feedBackId, formValues)
      notifications.show({
        title: 'Updated',
        color: 'green',
        message: 'Updated FeedBack',
      })
    }

    reset({
      text: '',
      lectureIds: '',
      assessmentValues: [{ key: '', value: '5', text: '' }],
    })
    close()
  }
  useEffect(() => {
    let err = mutationError?.message || getLectureError?.message
    if (err) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [mutationError, getLectureError])
  return (
    <FeedBackFormComponent
      onSubmit={onSubmit}
      data={feedBackData}
      lectures={lectures}
    />
  )
}

export default LecturesFormContainer
