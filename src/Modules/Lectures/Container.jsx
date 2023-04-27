import useModalNavigate from '@hooks/useModalRouter'
import constants from 'src/ModalTypes/index'
import LecturesList from './LecturesList'
import { Container, Button } from '@mantine/core'

const LecturesScreen = () => {
  const { open, match, close } = useModalNavigate()
  return (
    <Container>
      <Button variant="default" onClick={() => open(constants.LECTURES)}>
        Create Lecture
      </Button>
      <LecturesList />
    </Container>
  )
}

export default LecturesScreen
