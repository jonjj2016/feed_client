import useModalNavigate from 'src/Hooks/useModalRouter'
import constants from 'src/ModalTypes/index'
import { Button, ActionIcon, Table } from '@mantine/core'
import { useMutation, useFind } from 'figbird'

import { IconSettings, IconTrash } from '@tabler/icons-react'

const Lectures = () => {
  const { open } = useModalNavigate()
  const { data, isFetching } = useFind(constants.LECTURES, {})
  const { patch } = useMutation(constants.LECTURES)

  const rows = data?.map((element) => (
    <tr style={{ cursor: 'pointer' }} key={element._id}>
      <td>{element.title}</td>
      <td>{element.teaser}</td>
      <td>{element.text}</td>
      <td>{element.isActive ? 'yes' : 'No'}</td>
      <td>
        <ActionIcon
          onClick={() => {
            open(`${constants.LECTURES}`, {
              search: `lectureId=${element._id}`,
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
    <div>
      <Button
        onClick={() => {
          open(`${constants.LECTURES}`, {})
        }}
        variant="default"
      >
        Create Lecture
      </Button>
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

export default Lectures
