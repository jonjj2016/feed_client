import StudentModal from './StudentModal'
import LecturesModal from './LecturesModal'
import useModalNavigate from 'src/Hooks/useModalRouter'
import modalTypes from 'src/ModalTypes/index'

const CoreModal = () => {
  const { close, match } = useModalNavigate()

  return (
    <>
      <StudentModal
        opened={match(modalTypes.STUDENTS)}
        onClose={close}
        title="Students"
      />
      <LecturesModal
        opened={match(modalTypes.LECTURES)}
        onClose={close}
        title="Lectures"
      />
    </>
  )
}

export default CoreModal
