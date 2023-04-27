import { useEffect } from 'react'
import { Button } from '@mantine/core'
import useModalNavigate from 'src/Hooks/useModalRouter'
import { useSelector } from 'react-redux'
import { useMutation, useGet } from 'figbird'
import { notifications } from '@mantine/notifications'

import constants from 'src/ModalTypes/index'
import ModalWrapper from 'src/components/Modal'
import CurriculumForm from './Form'

const CurriculumContainer = ({ process }) => {
  const { open, match, close, params } = useModalNavigate()
  const { data } = useGet(constants.CURRICULA, params?.id)
  const { create, patch, error: mutationError } = useMutation(
    constants.CURRICULA,
  )
  const { userId } = useSelector((state) => state.global)

  const onSave = async (reset, formValues) => {
    if (process === 'create') {
      await create({ ...formValues, createdBy: userId })
      notifications.show({
        title: 'Congratulations',
        message: 'Successfully created Curriculum',
        color: 'green',
      })
    } else {
      await patch(params?.id, formValues, { new: true })
    }
    close()
    reset({
      text: '',
      title: '',
      teaser: '',
    })
    close()
  }
  useEffect(() => {
    if (mutationError) {
      notifications.show({
        title: mutationError.message,
        color: 'red',
        message: mutationError.message,
      })
    }
  }, [mutationError])
  const onDelete = async (data) => {
    if (params?.id) {
      await patch(params?.id, { new: true })
      close()
    }
  }
  return (
    <div>
      <ModalWrapper
        opened={match(constants.CURRICULA)}
        onClose={close}
        title="Student Feedback"
      >
        <CurriculumForm data={data} onSave={onSave} onDelete={onDelete} />
      </ModalWrapper>
      <Button variant="default" onClick={() => open(constants.CURRICULA)}>
        {process == 'create' ? 'Create Curricula' : 'Open'}
      </Button>
      <br />
      <br />
    </div>
  )
}

export default CurriculumContainer
