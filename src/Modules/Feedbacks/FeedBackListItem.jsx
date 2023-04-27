import React from 'react'
import {
  createStyles,
  Card,
  Group,
  Collapse,
  Text,
  rem,
  Rating,
} from '@mantine/core'
import FeedbackForm from 'src/components/Forms/FeedBackForm'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useFind } from 'figbird'
import constants from 'src/ModalTypes/index'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  item: {
    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    '& *': {
      cursor: 'pointer',
    },
  },

  title: {
    lineHeight: 1,
  },
}))

const FeedBackListItem = ({ title, description, data, feedback }) => {
  const [opened, { toggle, close }] = useDisclosure(false)
  const { patch, error } = useMutation(constants.FEEDBACKS)
  const { classes } = useStyles()
  const onFeedbackSave = async (reset, values) => {
    await patch(values._id, values)
    reset()
    close()
    console.log(values)
  }
  const items = data.map((item) => (
    <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>{item.key}</Text>
        <Text size="xs" color="dimmed">
          {item.text}
        </Text>
        <Rating readOnly count={10} value={item.value} />
      </div>
    </Group>
  ))

  return (
    <>
      <Card
        onClick={toggle}
        withBorder
        radius="md"
        p="xl"
        className={classes.card}
      >
        <Text fz="lg" className={classes.title} fw={500}>
          {title}
        </Text>
        <Text fz="xs" c="dimmed" mt={3} mb="xl">
          {description}
        </Text>
        {items}
      </Card>
      <br />
      <Collapse in={opened}>
        <FeedbackForm
          defaultValue={feedback}
          onSave={onFeedbackSave}
          lectures={[]}
        />
      </Collapse>
      <br />
    </>
  )
}

export default FeedBackListItem
