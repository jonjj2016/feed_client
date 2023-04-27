import { Modal } from '@mantine/core'
import PropTypes from 'prop-types'
import StudentForm from '@components/Forms/StudentForm/StudentFormContainer'

const StudentModal = ({ ...props }) => {
  return (
    <Modal {...props}>
      <StudentForm />
    </Modal>
  )
}

StudentModal.propTypes = {
  props: PropTypes.array,
}

export default StudentModal
