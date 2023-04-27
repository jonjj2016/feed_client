import { Modal } from '@mantine/core'
import PropTypes from 'prop-types'
import LecturesForm from '@app/Forms/LecturesForm/LecturesFormContainer'

const LecturesModal = ({ ...props }) => {
  return (
    <Modal {...props}>
      <LecturesForm />
    </Modal>
  )
}

LecturesModal.propTypes = {
  props: PropTypes.array,
}

export default LecturesModal
