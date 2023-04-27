import { DatePicker } from '@mantine/dates'
import { Group, Text } from '@mantine/core'

const Component = ({ error, description, label, ...props }) => {
  return (
    <>
      {label && <Text>{label}</Text>}
      <Group position="center">
        <DatePicker
          allowDeselect
          data-autofocus={props.onBlur}
          size="lg"
          {...props}
        />
      </Group>
      {error && (
        <Text sx={{ fontSize: '12px' }} color="red">
          {error}
        </Text>
      )}
    </>
  )
}

export default Component
