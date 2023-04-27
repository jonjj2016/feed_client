import React from 'react'
import { useFind, useGet } from 'figbird'
import { Text, Avatar, Group, rem, Button } from '@mantine/core'
import { Container } from '@mantine/core'

import constants from '@constants/index'
import { useParams } from 'react-router-dom'
import FeedBackListItem from '@modules/Feedbacks/FeedBackListItem'

const StudentDetails = () => {
  const { id } = useParams()
  const { data, error: studentGetError } = useGet(constants.STUDENTS, id)
  const {
    data: feedbacks,
    error: feedbackFindError,
  } = useFind(constants.FEEDBACKS, { query: { student: id } })

  return (
    <Container>
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
            feedback={feedback}
            description={feedback.text}
            title={feedback.lectureIds[0]}
            data={feedback.assessmentValues}
          />
        ))}
    </Container>
  )
}

export default StudentDetails
