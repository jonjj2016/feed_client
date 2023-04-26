import React from 'react'
import { SimpleGrid, Card, Divider, Text } from '@mantine/core'
import { Group, Menu, ActionIcon, rem } from '@mantine/core'

import {
  IconDots,
  IconEye,
  IconFileZip,
  IconTrash,
  IconSettings,
} from '@tabler/icons-react'
import CurriculaItem from './CurriculaItem'

const CurriculumList = ({ data = [], onEdit, onDelete, onPreview }) => {
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
      {data?.map((item) => (
        <CurriculaItem
          {...item}
          onEdit={onEdit}
          onPreview={onPreview}
          onDelete={onDelete}
        />
      ))}
    </SimpleGrid>
  )
}

export default CurriculumList
