import { Card, Divider, Text } from '@mantine/core'
import { Group, Menu, ActionIcon, rem } from '@mantine/core'

import { IconDots, IconEye, IconTrash, IconSettings } from '@tabler/icons-react'

const CurriculaItem = ({ _id, text, title, onEdit, onPreview, onDelete }) => {
  return (
    <Card withBorder shadow="sm" radius="md">
      <Group position="apart">
        <Text weight={500} size="lg" mt="md">
          {title}
        </Text>
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon>
              <IconDots size="1rem" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => onEdit(_id)}
              icon={<IconSettings size={rem(14)} />}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              onClick={() => onPreview(_id)}
              icon={<IconEye size={rem(14)} />}
            >
              Preview
            </Menu.Item>
            <Menu.Item
              onClick={() => onDelete(_id)}
              icon={<IconTrash size={rem(14)} />}
              color="red"
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Divider />
      <Text mt="xs" color="dimmed" size="sm">
        {text}
      </Text>
    </Card>
  )
}

export default CurriculaItem
