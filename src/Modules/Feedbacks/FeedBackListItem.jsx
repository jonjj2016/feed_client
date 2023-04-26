import React from 'react'
import {
  createStyles,
  Card,
  Group,
  Switch,
  Text,
  rem,
  Rating,
} from '@mantine/core'

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

const FeedBackListItem = ({ title, description, data }) => {
  const { classes } = useStyles()

  const items = data.map((item) => (
    <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>{item.key}</Text>
        <Text size="xs" color="dimmed">
          {item.text}
        </Text>
        <Rating readOnly count={10} value={item.value} />
      </div>
      {/* <Switch
        onLabel="ON"
        offLabel="OFF"
        className={classes.switch}
        size="lg"
      /> */}
    </Group>
  ))

  return (
    <>
      <Card withBorder radius="md" p="xl" className={classes.card}>
        <Text fz="lg" className={classes.title} fw={500}>
          {title}
        </Text>
        <Text fz="xs" c="dimmed" mt={3} mb="xl">
          {description}
        </Text>
        {items}
      </Card>
      <br />
      <br />
    </>
  )
}

export default FeedBackListItem
