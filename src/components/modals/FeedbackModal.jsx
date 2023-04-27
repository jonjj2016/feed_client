import { Modal } from '@mantine/core'
import PropTypes from 'prop-types'
import FeedbackForm from '@app/Forms/feedbackForm/FeedbackFormContainer'

const FeedbackModal = ({ ...props }) => {
  return (
    <Modal {...props}>
      <FeedbackForm />
    </Modal>
  )
}

FeedbackModal.propTypes = {
  props: PropTypes.array,
}

export default FeedbackModal
