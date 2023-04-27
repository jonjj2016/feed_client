import { Button } from '@mantine/core'
import { useFind, useMutation } from 'figbird'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import constants from 'src/ModalTypes/index'
import ModalWrapper from 'src/components/Modal'
import { useSelector } from 'react-redux'
import FeedBackForm from './Form'
import { useSearchParams } from 'react-router-dom'
import useModalNavigate from '@hooks/useModalRouter'

const FeedBacks = () => {
  let [searchParams] = useSearchParams()
  const studentId = searchParams.get('studentId')
  const { open, match, close } = useModalNavigate()
  const { data: lectures } = useFind(constants.LECTURES, {
    query: { $sort: '-createdAt' },
  })
  const { userId } = useSelector((state) => state.global)

  const { create, patch, feedBackMutatePatch, error } = useMutation(
    constants.FEEDBACKS,
  )
  useEffect(() => {
    let err = feedBackMutatePatch?.message

    if (err) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [feedBackMutatePatch])
  useEffect(() => {
    notifications.show({
      title: 'Error',
      color: 'red',
      message: 'Something went wrong',
    })
  }, [error])
  const onSave = async (reset, formValues) => {
    const data = { ...formValues, student: studentId, instructorId: userId }
    const feedBack = await create(data)
    notifications.show({
      title: 'Success',
      color: 'green',
      message: 'Added FeedBack',
    })
    reset({
      text: '',
      lectureIds: '',
      assessmentValues: [{ key: '', value: '5', text: '' }],
    })
    close()
  }
  return (
    <div>
      <ModalWrapper
        opened={match(constants.FEEDBACKS)}
        onClose={close}
        title="Student Feedback"
      >
        <FeedBackForm onSave={onSave} lectures={lectures} />
      </ModalWrapper>
    </div>
  )
}

export default FeedBacks
