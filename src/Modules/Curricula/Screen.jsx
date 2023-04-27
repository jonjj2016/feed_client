import { useEffect } from 'react'
import FormContainer from './FormContainer'
import CurriculumList from './app/CurriculumList'
import { useMutation, useGet, useFind } from 'figbird'
import useModalNavigate from 'src/Hooks/useModalRouter'
import { Container, Button } from '@mantine/core'
import constants from 'src/ModalTypes/index'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

const Screen = () => {
  const navigate = useNavigate()
  const { data, error, isFetching } = useFind(constants.CURRICULA, {})
  const { patch, error: mutationError } = useMutation(constants.CURRICULA)
  const { open, match, close, params } = useModalNavigate()
  useEffect(() => {
    if (error?.message) {
      notifications.show({
        title: error.message || mutationError.message,
        color: 'red',
        message: error.message || mutationError.message,
      })
    }
  }, [error, mutationError])

  const onEdit = (id) =>
    open(constants.CURRICULA, {
      search: `curriculaId=${id}`,
    })
  const onDelete = async (id) => {
    await patch(id)
    notifications.show({
      title: 'Successfully deleted',
      color: 'green',
      message: 'Curriculum has been deleted',
    })
  }
  const onPreview = (id) => {
    navigate(`/${constants.CURRICULA}/${id}`)
  }
  return (
    <>
      <Button variant="default" onClick={() => open(constants.CURRICULA)}>
        Create Curricula
      </Button>
      <br />
      <br />
      <CurriculumList
        onPreview={onPreview}
        onDelete={onDelete}
        onEdit={onEdit}
        data={data}
      />
    </>
  )
}

export default Screen
