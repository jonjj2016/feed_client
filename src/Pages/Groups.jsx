import useModalNavigate from 'src/Hooks/useModalRouter.js'
import { useEffect, useState } from 'react'
import constants from 'src/Constants/index'
import { Button, ActionIcon, Table } from '@mantine/core'
import { useMutation, useFind } from 'figbird'
import { useNavigate } from 'react-router-dom'

import { IconSettings, IconTrash } from '@tabler/icons-react'

const Groups = () => {
  const navigate = useNavigate()
  //   const { open, close, match } = useModalNavigate()
  const { data, isFetching } = useFind(constants.GROUPS, {
    query: { isDeleted: false },
  })
  const { patch } = useMutation(constants.GROUPS)

  const [elements, setElements] = useState([])
  const rows = elements.map((element) => (
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
        <ActionIcon
          onClick={() => {
            // open(`${constants.GROUPS}`, {
            //   search: `updateId=${element._id}&new=true`,
            // })
          }}
        >
          <IconSettings size="1.125rem" />
        </ActionIcon>
      </td>
      <td>
        <ActionIcon
          onClick={async () => {
            // await patch(element._id, { isDeleted: true }, { new: true })
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
      {/* <Button onClick={() => open(constants.GROUPS)} variant="default">
        Create
      </Button> */}
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
