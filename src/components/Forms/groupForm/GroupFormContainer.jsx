import { useEffect } from 'react'
import GroupFormComponent from './GroupFormComponent'
import { useMutation, useGet } from 'figbird'
import { useSearchParams } from 'react-router-dom'
import useModalNavigate from 'src/Hooks/useModalRouter'

import { notifications } from '@mantine/notifications'
import types from 'src/ModalTypes/index'

const GroupsFormContainer = () => {
  let [searchParams] = useSearchParams()
  const { close } = useModalNavigate()

  const groupId = searchParams.get('groupId')
  const curriculumId = searchParams.get('curriculumId')

  const { create, patch, error: mutationError } = useMutation(types.GROUPS)

  const { data: groupData, error: getError } = useGet(types.GROUPS, groupId, {
    skip: !groupId,
  })

  const onSubmit = async (reset, formValues) => {
    if (!groupId) {
      const tt = await create({
        ...formValues,
        curriculumId,
      })

      notifications.show({
        autoClose: 1500,
        title: 'Created',
        message: 'Successfully created Group',
        color: 'green',
      })
    } else {
      await patch(groupId, formValues)
      notifications.show({
        autoClose: 1500,
        title: 'Updated',
        message: 'Successfully Updated Group',
        color: 'green',
      })
    }

    reset({
      title: '',
      text: '',
    })
    close()
  }
  useEffect(() => {
    let err = mutationError?.message || getError?.message
    if (err) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [mutationError, getError])
  return <GroupFormComponent onSubmit={onSubmit} data={groupData} />
}

export default GroupsFormContainer
