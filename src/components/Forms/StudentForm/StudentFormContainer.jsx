import { useEffect } from 'react'
import StudentFormComponent from './StudentFormComponent'
import { useSelector } from 'react-redux'
import { useMutation, useGet } from 'figbird'
import { useSearchParams } from 'react-router-dom'
import useModalNavigate from 'src/Hooks/useModalRouter'

import { notifications } from '@mantine/notifications'
import types from 'src/ModalTypes/index'

const StudentFormContainer = () => {
  let [searchParams] = useSearchParams()
  const { close } = useModalNavigate()

  const groupId = searchParams.get('groupId')
  const studentId = searchParams.get('studentId')

  const { create, patch, error: mutationError } = useMutation(types.STUDENTS)
  const { patch: groupsPatch, error: groupsError } = useMutation(types.GROUPS)
  const { data: groupData, error: getGroupError } = useGet(
    types.GROUPS,
    groupId,
    { skip: !groupId },
  )
  const { data: studentData } = useGet(types.STUDENTS, studentId, {
    skip: !studentId,
  })

  // temp solutions userId to be real userId
  const { userId } = useSelector((state) => state.global)

  const onSubmit = async (reset, formValues) => {
    if (!studentId) {
      const student = await create({
        ...formValues,
        createdBy: userId,
      })
      if (student && groupId) {
        await groupsPatch(groupId, {
          participantIds: [...groupData.participantIds, student._id],
        })
      }
      notifications.show({
        autoClose: 1500,
        title: 'Congratulations',
        message: 'Successfully created Student',
        color: 'green',
      })
    }
    if (groupId) {
      await patch(groupId, formValues, { new: true })
    }
    reset({
      fName: '',
      lName: '',
      dob: '',
      dobEstimate: '',
    })
    close()
  }
  useEffect(() => {
    let err =
      groupsError?.message || mutationError?.message || getGroupError?.message
    if (err) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [mutationError, groupsError])
  return <StudentFormComponent onSubmit={onSubmit} data={studentData} />
}

export default StudentFormContainer
