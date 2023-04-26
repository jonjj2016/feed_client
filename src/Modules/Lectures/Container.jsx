import ModalWrapper from '@app/Modal'
import React from 'react'
import Form from './Form'
import useModalNavigate from '@hooks/useModalRouter'
import constants from '@constants/index'
import LecturesList from './LecturesList'
import {
  useNavigate,
  useLocation,
  useSearchParams,
  useParams,
} from 'react-router-dom'

const Container = () => {
  const { open, match, close } = useModalNavigate()
  const { pathname, hash, state } = useLocation()
  console.log(match(constants.LECTURES), hash)
  return (
    <div>
      <ModalWrapper
        opened={match(constants.LECTURES)}
        onClose={close}
        title="Student Feedback"
      >
        <Form />
      </ModalWrapper>
      <LecturesList />
      {/* <Button variant="default" onClick={() => open(constants.FEEDBACKS)}>
        Open
      </Button> */}
    </div>
  )
}

export default Container
