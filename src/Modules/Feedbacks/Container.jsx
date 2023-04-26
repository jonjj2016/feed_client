import { Button } from '@mantine/core'
import { useFind, useMutation } from 'figbird'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import constants from '@constants/index'
import ModalWrapper from '@app/Modal'
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

  const { create, patch, feedBackMutatePatch } = useMutation(
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
  const onSave = async (reset, formValues) => {
    console.log(formValues)
    const data = { ...formValues, student: studentId, instructorId: userId }
    const feedBack = await create(data)
    console.log('🚀 ~ file: Container.jsx:34 ~ onSave ~ feedBAck:', feedBack)
    notifications.show({
      title: 'Success',
      color: 'green',
      message: 'Added FeedBack',
    })
    //   useEffect(
    //     () => () => {
    reset({
      text: '',

      lectureIds: '',
      assessmentValues: [{ key: '', value: '5', text: '' }],
    })
    close()
    //     },
    //     [],
    //   )
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
      {/* <Button variant="default" onClick={() => open(constants.FEEDBACKS)}>
        Open
      </Button> */}
    </div>
  )
}

export default FeedBacks
