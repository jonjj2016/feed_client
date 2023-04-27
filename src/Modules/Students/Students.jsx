import useModalNavigate from 'src/Hooks/useModalRouter'
import { useEffect, useState } from 'react'
import constants from 'src/ModalTypes/index'
import { Container, ActionIcon, Table } from '@mantine/core'
import { useMutation, useFind } from 'figbird'
import { useNavigate } from 'react-router-dom'
import { IconSettings, IconTrash } from '@tabler/icons-react'
import Form from './FormContainer'
import { notifications } from '@mantine/notifications'

const Students = ({}) => {
  const navigate = useNavigate()
  const { open } = useModalNavigate()
  const { data, error } = useFind(constants.STUDENTS, {})
  const { patch } = useMutation(constants.STUDENTS)
  useEffect(() => {
    if (error) {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      })
    }
  }, [error])
  const rows = data?.map((element) => (
    <tr style={{ cursor: 'pointer' }} key={element._id}>
      <td onClick={() => navigate(`/students/${element._id}`)}>
        {element.fName} {element.lName}
      </td>
      <td>{element.dob}</td>
      <td>{element.isActive ? 'yes' : 'No'}</td>
      <td>
        <ActionIcon
          onClick={() => {
            open(`${constants.STUDENTS}`, {
              state: { update: element._id, element },
              search: `updateId=${element._id}&new=true`,
            })
          }}
        >
          <IconSettings size="1.125rem" />
        </ActionIcon>
      </td>
      <td>
        <ActionIcon
          onClick={async () => {
            await patch(element._id, { new: true })
          }}
        >
          <IconTrash size="1.125rem" />
        </ActionIcon>
      </td>
    </tr>
  ))

  return (
    <Container size="md">
      <Form process="create" btntxt="Create Student" />
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th key={7}> Name</th>
            <th key={5}>dob</th>
            <th key={3}>Active</th>
            <th key={2}>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  )
}

export default Students
