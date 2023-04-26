import React from 'react'
import { useFind, useMutation, useGet } from 'figbird'
import { createStyles, Text, Avatar, Group, rem } from '@mantine/core'

import constants from '@constants/index'
import { useParams } from 'react-router-dom'
import FeedBackListItem from '@modules/Feedbacks/FeedBackListItem'

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}))

const StudentDetails = () => {
  const { id } = useParams()
  const { data, error: studentGetError } = useGet(constants.STUDENTS, id)
  const {
    data: feedbacks,
    error: feedbackFindError,
  } = useFind(constants.FEEDBACKS, { query: { student: id } })

  return (
    <div>
      <Group>
        <Avatar src={''} alt={data?.fName} radius="xl" />
        <div>
          <Text size="sm">{data?.fName}</Text>
          <Text size="xs" color="dimmed">
            {data?.createdAt}
          </Text>
        </div>
      </Group>
      <Text size="sm">Total FeedBacks {feedbacks?.length}</Text>
      <br />
      {feedbacks &&
        feedbacks.map((feedback) => (
          <FeedBackListItem
            description={feedback.text}
            title={feedback.lectureIds[0]}
            data={feedback.assessmentValues}
          />
        ))}
    </div>
  )
}

export default StudentDetails
