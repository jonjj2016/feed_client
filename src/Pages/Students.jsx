import useModalNavigate from 'src/Hooks/useModalRouter'
import { useEffect, useState } from 'react'
import constants from 'src/Constants/index'
import { Button, ActionIcon, Table } from '@mantine/core'
import { useMutation, useFind } from 'figbird'

import { IconSettings, IconTrash } from '@tabler/icons-react'

const Students = () => {
  const { open } = useModalNavigate()
  const { data, isFetching } = useFind(constants.STUDENTS, {
    query: { isDeleted: false },
  })
  const { patch } = useMutation(constants.STUDENTS)

  const [elements, setElements] = useState([])
  const rows = elements.map((element) => (
    <tr style={{ cursor: 'pointer' }} key={element._id}>
      <td>{element.fName}</td>
      <td>{element.lName}</td>
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
            await patch(element._id, { isDeleted: true }, { new: true })
          }}
        >
          <IconTrash size="1.125rem" />
        </ActionIcon>
      </td>
    </tr>
  ))

  useEffect(() => {
    if (!isFetching && data) {
      setElements(data)
    }
  }, [data])

  return (
    <div>
      <Button onClick={() => open(constants.STUDENTS)} variant="default">
        Create
      </Button>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th key={7}>First Name</th>
            <th key={6}>Last Name</th>
            <th key={5}>dob</th>
            <th key={3}>Active</th>
            <th key={2}>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  )
}

export default Students
