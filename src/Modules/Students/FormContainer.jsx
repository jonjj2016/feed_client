import { useEffect } from 'react'
import { Button } from '@mantine/core'
import useModalNavigate from 'src/Hooks/useModalRouter'
import { useSelector } from 'react-redux'
import { useMutation, useGet } from 'figbird'
import { notifications } from '@mantine/notifications'
import { useParams, useNavigate } from 'react-router-dom'
import useFigbird from '@hooks/useFigbird'

import constants from '@constants/index'
import ModalWrapper from '@app/Modal'
import StudentForm from './Form'

const StudentsContainer = ({ process, btntxt }) => {
  const { id } = useParams()

  const { open, match, close, params } = useModalNavigate()
  const { data } = useGet(constants.STUDENTS, params?.id)
  const { create, patch, error: mutationError } = useMutation(
    constants.STUDENTS,
  )
  const { userId } = useSelector((state) => state.global)
  const { patch: groupsPatch, error: groupsError } = useMutation(
    constants.GROUPS,
  )
  // temp solution befor making it in back
  const { data: groupData, error: getGroupError } = useGet(constants.GROUPS, id)
  const onSave = async (reset, formValues) => {
    if (process === 'create') {
      const student = await create({
        ...formValues,
        createdBy: userId,
      })
      console.log(groupData)
      if (student && groupData) {
        const tt = await groupsPatch(id, {
          participantIds: [...groupData.participantIds, student._id],
        })
      }
      notifications.show({
        title: 'Congratulations',
        message: 'Successfully created Student',
        color: 'green',
      })
    } else {
      await patch(params?.id, formValues, { new: true })
    }
    close()
    reset({
      fName: '',
      lName: '',
      dob: '',
    })
    close()
  }
  useEffect(() => {
    let err =
      groupsError?.message || mutationError?.message || getGroupError?.message
    if (mutationError) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [mutationError, groupsError])
  const onDelete = async (data) => {
    if (params?.id) {
      await patch(params?.id, { isDeleted: true }, { new: true })
      close()
    }
  }
  return (
    <div>
      <ModalWrapper
        opened={match(constants.CURRICULA)}
        onClose={close}
        title="Add Student"
      >
        <StudentForm data={data} onSave={onSave} onDelete={onDelete} />
      </ModalWrapper>
      <Button variant="default" onClick={() => open(constants.CURRICULA)}>
        {btntxt || process == 'create' ? 'Create Student' : 'Open'}
      </Button>
      <br />
      <br />
    </div>
  )
}

export default StudentsContainer
