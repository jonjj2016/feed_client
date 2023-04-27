import React from 'react'
import { Button, Group, Container, Title, Table, Paper } from '@mantine/core'
import constants from 'src/ModalTypes/index'
import useModalNavigate from '@hooks/useModalRouter'
// import CrateGroupModal from '../groups/FormContainer'
import { useGet, useFind, useMutation } from 'figbird'
// import { StudentTable } from '@components/Tables'
import { Tabs, ActionIcon } from '@mantine/core'
import {
  IconPhoto,
  IconMessageCircle,
  IconArrowBadgeRight,
  IconSettings,
  IconUserEdit,
} from '@tabler/icons-react'

import { useParams, useNavigate } from 'react-router-dom'

const GroupDetails = () => {
  const { open } = useModalNavigate()
  const navigate = useNavigate()
  const { id } = useParams()
  // const { patch: patchGroup } = useMutation(constants.GROUPS)
  const { data: curriculaData } = useGet(constants.CURRICULA, id)
  const { data: groupsData } = useFind(constants.GROUPS, {
    query: { curriculumId: id },
  })

  const rows = groupsData?.map((element) => (
    <tr key={element._id}>
      <td>{element.title}</td>
      <td>{element.text}</td>
      <td>{element.participantIds.length}</td>
      <td>{element.createdAt}</td>
      <td>
        <ActionIcon onClick={() => navigate(`/groups/${element._id}`)}>
          <IconArrowBadgeRight />
        </ActionIcon>
      </td>
    </tr>
  ))
  return (
    <div>
      <Tabs defaultValue="dashboard">
        <Tabs.List>
          <Tabs.Tab value="dashboard" icon={<IconPhoto size="0.8rem" />}>
            Dashboard
          </Tabs.Tab>
          <Tabs.Tab value="groups" icon={<IconUserEdit size="0.8rem" />}>
            Groups
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Container>
          <Tabs.Panel value="dashboard" pt="xs">
            <Title>{curriculaData?.title}</Title>
            <br />
            <Paper p="5rem" color="#999">
              {curriculaData?.text}
            </Paper>
            <br />
            <Paper p="5rem" color="#999">
              {curriculaData?.teaser}
            </Paper>
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
            <Button onClick={() => open(constants.CURRICULA)} variant="default">
              Create Curriculum
            </Button>
          </Tabs.Panel>
          <Tabs.Panel value="groups" pt="xs">
            <Button
              variant="default"
              onClick={() =>
                open(constants.GROUPS, {
                  search: `curriculumId=${id}`,
                })
              }
            >
              Create Group
            </Button>
            <br />
            <br />
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Text</th>
                  <th>Number of Students</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Tabs.Panel>
        </Container>
      </Tabs>

      {/* 

        


        
      </Tabs> */}
    </div>
  )
}

export default GroupDetails
