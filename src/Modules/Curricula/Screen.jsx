import { useEffect } from 'react'
import FormContainer from './FormContainer'
import CurriculumList from './app/CurriculumList'
import { useMutation, useGet, useFind } from 'figbird'
import useModalNavigate from 'src/Hooks/useModalRouter'
import { Container } from '@mantine/core'
import constants from '@constants/index'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

const Screen = () => {
  const navigate = useNavigate()
  const { data, error, isFetching } = useFind(constants.CURRICULA, {
    query: { isDeleted: false },
  })
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
  useEffect(() => {
    notifications.show({
      title: 'Loading data',
      color: 'green',
      loading: isFetching,
      message: 'Loading Curriculum',
    })
  }, [])
  const onEdit = (id) => navigate(`/${constants.CURRICULA}/${id}#curricula`)
  const onDelete = async (id) => {
    await patch(id, { isDeleted: true }, { new: true })
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
      <FormContainer process="create" />
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
