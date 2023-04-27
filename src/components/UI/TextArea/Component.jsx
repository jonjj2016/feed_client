import { Textarea } from '@mantine/core'

const GenericInput = ({ description, ...props }) => {
  return <Textarea withAsterisk {...props} autosize />
}

export default GenericInput
