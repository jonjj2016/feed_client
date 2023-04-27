import Button from '@app/ui_elements/button/button'
import RatingController from '@app/ui_elements/rating/rating-controller'
import SelectController from '@app/ui_elements/select/select-controller'
import TextareaController from '@app/ui_elements/textarea/textarea-controller'
import { Box, Card, Flex } from '@mantine/core'

const AssessmentFormCard = ({
  index,
  fieldsLength,
  onRemove,
  onAppend,
  control,
}) => {
  return (
    <Box my={20}>
      <Card>
        <Flex direction={{ base: 'column' }} gap={{ base: 'sm', sm: 'lg' }}>
          <SelectController
            control={control}
            name={`assessmentValues.${index}.key`}
            searchable
            data={[
              { label: 'Behavior', value: 'behavior' },
              { label: 'Focus', value: 'focus' },
            ]}
            placeholder="Select Area"
            label="Area"
            withAsterisk
          />
          <RatingController
            control={control}
            name={`assessmentValues[${index}].value`}
            label="Rate"
            placeholder="Pick one"
            count={10}
          />
          <br />
          <TextareaController
            control={control}
            name={`assessmentValues[${index}].text`}
            placeholder="Text"
            label="Text"
            minRows={4}
          />
          <Flex gap={5} justify={'flex-end'}>
            {fieldsLength !== 1 && (
              <Button color="red" onClick={() => onRemove(index)}>
                Remove
              </Button>
            )}
            {fieldsLength - 1 === index && (
              <Button
                color="indigo"
                onClick={() => onAppend({ key: '', value: '5', text: '' })}
              >
                Add
              </Button>
            )}
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}

export default AssessmentFormCard
