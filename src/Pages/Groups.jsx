import constants from 'src/ModalTypes/index'
import { Button, ActionIcon, Table } from '@mantine/core'
import { useMutation, useFind } from 'figbird'
import { useNavigate } from 'react-router-dom'

import { IconSettings, IconTrash } from '@tabler/icons-react'

const Groups = () => {
  const navigate = useNavigate()
  const { data } = useFind(constants.GROUPS, {})

  const rows = data?.map((element) => (
    <tr
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/groups/${element._id}`)}
      key={element._id}
    >
      <td>{element.title}</td>
      <td>{element.teaser}</td>
      <td>{element.text}</td>
      <td>{element.isActive ? 'yes' : 'No'}</td>
      <td>
        <ActionIcon onClick={() => {}}>
          <IconSettings size="1.125rem" />
        </ActionIcon>
      </td>
      <td>
        <ActionIcon onClick={async () => {}}>
          <IconTrash size="1.125rem" />
        </ActionIcon>
      </td>
    </tr>
  ))

  return (
    <div>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th key={7}>Title</th>
            <th key={6}>Teaser</th>
            <th key={5}>Text</th>
            <th key={3}>Active</th>
            <th key={2}>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  )
}

export default Groups
