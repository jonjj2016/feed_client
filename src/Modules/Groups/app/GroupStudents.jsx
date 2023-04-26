import { SimpleGrid, Group, ActionIcon } from '@mantine/core'
import { Card, Divider, Text } from '@mantine/core'
import { Menu, rem } from '@mantine/core'

import { IconDots, IconEye, IconTrash } from '@tabler/icons-react'

import { IconSettings } from '@tabler/icons-react'

const GroupStudents = ({ students, onDelete, onFeedBack, onPreview }) => {
  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { maxWidth: '62rem', cols: 3, spacing: 'md' },
        { maxWidth: '48rem', cols: 2, spacing: 'sm' },
        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
      ]}
    >
      {students?.map((item) => (
        <Card key={item._id} withBorder shadow="sm" radius="md">
          <Group position="apart">
            <Text weight={500} size="lg" mt="md">
              {item.fName}
            </Text>
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size="1rem" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => onFeedBack(item._id)}
                  icon={<IconSettings size={rem(14)} />}
                >
                  Add Feedback
                </Menu.Item>
                <Menu.Item
                  onClick={() => onPreview(item._id)}
                  icon={<IconEye size={rem(14)} />}
                >
                  Preview
                </Menu.Item>
                <Menu.Item
                  onClick={() => onDelete(item._id)}
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
            {item.lName}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default GroupStudents
