import { Modal } from '@mantine/core'
import PropTypes from 'prop-types'
import GroupForm from '@app/Forms/groupForm/GroupFormContainer'

const GroupModal = ({ ...props }) => {
  return (
    <Modal {...props}>
      <GroupForm />
    </Modal>
  )
}

GroupModal.propTypes = {
  props: PropTypes.array,
}

export default GroupModal
