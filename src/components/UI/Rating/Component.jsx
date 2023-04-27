import React from 'react'
import { Rating, Input } from '@mantine/core'

const GenericInput = ({ error, description, label, ...props }) => {
  return (
    <Input.Wrapper description={description} error={error} label={label}>
      <Rating defaultValue={5} {...props} />
    </Input.Wrapper>
  )
}

export default GenericInput
