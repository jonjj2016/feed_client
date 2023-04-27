import { useEffect } from 'react'
import CurriculaFormComponent from './CurriculaFormComponent'
import { useSelector } from 'react-redux'
import { useMutation, useGet } from 'figbird'
import { useSearchParams } from 'react-router-dom'
import useModalNavigate from 'src/Hooks/useModalRouter'

import { notifications } from '@mantine/notifications'
import types from 'src/ModalTypes/index'

const CurriculaFormContainer = () => {
  let [searchParams] = useSearchParams()
  const { close } = useModalNavigate()

  const curriculaId = searchParams.get('curriculaId')

  const { create, patch, error: mutationError } = useMutation(types.CURRICULA)

  const { data: curriculaData, getError } = useGet(
    types.CURRICULA,
    curriculaId,
    {
      skip: !curriculaId,
    },
  )

  // temp solutions userId to be real userId
  const { userId } = useSelector((state) => state.global)

  const onSubmit = async (reset, formValues) => {
    if (!curriculaId) {
      await create({
        ...formValues,
        createdBy: userId,
      })

      notifications.show({
        autoClose: 1500,
        title: 'Created',
        message: 'Successfully created Curricula',
        color: 'green',
      })
    } else {
      await patch(curriculaId, formValues)
      notifications.show({
        autoClose: 1500,
        title: 'Updated',
        message: 'Successfully Updated',
        color: 'green',
      })
    }
    reset({
      title: '',
      text: '',
      teaser: '',
    })
    close()
  }
  useEffect(() => {
    let err = getError?.message || mutationError?.message
    if (err) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [mutationError, getError])
  return <CurriculaFormComponent onSubmit={onSubmit} data={curriculaData} />
}

export default CurriculaFormContainer
