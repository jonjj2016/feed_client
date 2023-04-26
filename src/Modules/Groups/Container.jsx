import { useEffect } from 'react'
import { Button, Text, Title, Table } from '@mantine/core'
import constants from 'src/Constants/index'
import useModalNavigate from '@hooks/useModalRouter'
import { useGet, useFind, useMutation } from 'figbird'
import GroupStudents from './app/GroupStudents'
import FeedbackForm from '@modules/FeedBacks/Container'
import { notifications } from '@mantine/notifications'
import StudentsTransferList from '@modules/Students/TransferList'

import StudentCreate from '@modules/Students/FormContainer'
import { Tabs } from '@mantine/core'
import { IconPhoto, IconUserEdit } from '@tabler/icons-react'

import { useNavigate, useParams } from 'react-router-dom'

const GroupDetails = () => {
  const { open } = useModalNavigate()
  const navigate = useNavigate()
  const { id } = useParams()
  const { patch: patchGroup, error: groupMutationError } = useMutation(
    constants.GROUPS,
  )
  const { data: groupData, error: groupGetError } = useGet(constants.GROUPS, id)

  var { data: studentData, error: studentError } = useFind(constants.STUDENTS, {
    query: { _id: groupData?.participantIds },
  })

  const { data: allStudents, error: allStudentsError } = useFind(
    constants.STUDENTS,
  )
  useEffect(() => {
    let err =
      studentError?.message ||
      groupMutationError?.message ||
      groupGetError?.error
    if (err) {
      notifications.show({
        title: err,
        color: 'red',
        message: err,
      })
    }
  }, [groupMutationError, groupGetError, studentError])
  const onDelete = async (studentId) => {
    const participantIds = groupData.participantIds.filter(
      (i) => i !== studentId,
    )
    await patchGroup(
      id,
      {
        ...groupData,
        participantIds,
      },
      { new: true },
    )
    notifications.show({
      title: 'Congratulations',
      message: 'Removed Student Successfully',
      color: 'green',
    })
  }
  const onFeedBack = (studentId) => {
    open(constants.FEEDBACKS, { search: `studentId=${studentId}` })
  }
  const onUserProfile = (id) => navigate(`/students/${id}`)
  return (
    <div>
      <FeedbackForm />
      <Tabs defaultValue="students">
        <Tabs.List>
          <Tabs.Tab value="dashboard" icon={<IconPhoto size="0.8rem" />}>
            Dashboard
          </Tabs.Tab>
          <Tabs.Tab value="students" icon={<IconUserEdit size="0.8rem" />}>
            Students
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="dashboard" pt="xs">
          <Title>{groupData?.title}</Title>
          <Text color="#999">{groupData?.text}</Text>
        </Tabs.Panel>
        <Tabs.Panel value="settings" pt="xs">
          <Button
            onClick={() =>
              open(constants.STUDENTS, {
                search: `groupId=${id}`,
              })
            }
            variant="default"
          >
            Add Student
          </Button>
          <Button
            onClick={() =>
              open(constants.CURRICULA, {
                search: `groupId=${id}`,
              })
            }
            variant="default"
          >
            Create Curriculum
          </Button>
        </Tabs.Panel>
        <Tabs.Panel value="students" pt="xs">
          <StudentCreate process="create" />
          {/* <StudentsTransferList
            studentsList={studentData || []}
            groupData={groupData || []}
          /> */}
          <GroupStudents
            onFeedBack={onFeedBack}
            onDelete={onDelete}
            students={studentData}
            onPreview={onUserProfile}
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default GroupDetails
