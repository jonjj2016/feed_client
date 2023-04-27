import StudentModal from './StudentModal'
import LecturesModal from './LecturesModal'
import FeedBackModal from './FeedbackModal'
import GroupModal from './GroupModal'
import CurriculaModal from './CurriculaModal'
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
      <CurriculaModal
        opened={match(modalTypes.CURRICULA)}
        onClose={close}
        title="Curricula"
      />
      <FeedBackModal
        opened={match(modalTypes.FEEDBACKS)}
        onClose={close}
        title="Curricula"
      />
      <GroupModal
        opened={match(modalTypes.GROUPS)}
        onClose={close}
        title="Curricula"
      />
    </>
  )
}

export default CoreModal
