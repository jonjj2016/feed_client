import { Modal } from '@mantine/core'
import PropTypes from 'prop-types'
import LecturesForm from '@app/Forms/curriculaForm/CurriculaFormContainer'

const CurriculaModal = ({ ...props }) => {
  return (
    <Modal {...props}>
      <LecturesForm />
    </Modal>
  )
}

CurriculaModal.propTypes = {
  props: PropTypes.array,
}

export default CurriculaModal
