// import Input from '@components/Base/UI/Input'
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/UI/Input/Controller'
import { IconHeading } from '@tabler/icons-react'
import { Box, Collapse, Flex, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm, useFieldArray } from 'react-hook-form'
import AssessmentFormCard from './AssessmentFormCard'
import TextArea from 'src/components/UI/TextArea/Controller'
import { useEffect } from 'react'
import TextareaController from '@app/ui_elements/textarea/textarea-controller'
import RatingController from '@app/ui_elements/rating/rating-controller'
import Button from '@app/ui_elements/button/button'
import * as yup from 'yup'
import SelectController from '@app/ui_elements/select/select-controller'
import types from 'src/ModalTypes/index'

const schema = yup.object().shape({
  text: yup.string().max(250).required().label('Text'),
  lectureIds: yup.string().required().label('Lecture'),
  assessmentValues: yup.array().of(
    yup.object().shape({
      key: yup.string().ensure().required().label('Area'),
      value: yup.string().required().label('Rate'),
      text: yup.string().required().label('Text'),
    }),
  ),
})

const FeedBackForm = ({ onSubmit, data, lectures }) => {
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      assessmentValues: [{ key: '', value: '5', text: '' }],
    },
  })

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key) => {
        setValue(key, data[key])
      })
    }
  }, [data])
  const [opened, { toggle }] = useDisclosure(false)
  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: 'assessmentValues',
  })
  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit((vals) => onSubmit(reset, vals))}
    >
      {/* <TextArea
        control={control}
        name={`text`}
        error={errors['text']?.message}
        rules={{ required: 'Text is required' }}
        placeholder="Text"
        label="Text"
        minRows={5}
        maxRows={10}
      />
      <br />
      <Select
        control={control}
        name="lectureIds"
        rules={{ required: 'Lecture  is required' }}
        error={errors['lectureIds']?.message}
        placeholder="Select are of Assessment"
        label="Select Lecture"
        searchable
        nothingFound="Nothing found"
        dropdownPosition="bottom"
        multiple
        data={lectures?.map((i) => ({ label: i.title, value: i._id })) || []}
      />
      {!opened && <Button onClick={toggle}>Assessment</Button>}

      <Collapse in={opened}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <br />
            <Card>
              <Select
                control={control}
                nothingFound="Nothing found"
                name={`assessmentValues.${index}.key`}
                searchable
                // creatable
                data={[
                  { label: 'Behavior', value: 'behavior' },
                  { label: 'Focus', value: 'focus' },
                ]}
                error={errors[`assessmentValues.${index}.key`]?.message}
                rules={{ required: 'This field is required' }}
                placeholder="Text"
                label="Area"
              />
              <br />
              <Rating
                control={control}
                name={`assessmentValues[${index}].value`}
                // error={errors[`assessment[${index}].value`]?.message}
                label="Rate "
                placeholder="Pick one"
                minRows={5}
                maxRows={10}
                defaultValue={5}
                count={10}
              />
              <br />
              <TextArea
                control={control}
                name={`assessmentValues[${index}].text`}
                placeholder="Text"
                label="Text"
                minRows={5}
                maxRows={10}
              />
              <br />
            </Card>

            <div className="btn-box">
              {fields.length !== 1 && (
                <Button onClick={() => remove(index)}>Remove</Button>
              )}
              {fields.length - 1 === index && (
                <Button
                  onClick={() => append({ key: '', value: '5', text: '' })}
                >
                  Add
                </Button>
              )}
            </div>
          </div>
        ))}
      </Collapse>

      <br /> */}
      <Flex direction={{ base: 'column' }} gap={{ base: 'sm', sm: 'lg' }}>
        <TextareaController
          control={control}
          name={`text`}
          placeholder="Text"
          withAsterisk
          label="Text"
          minRows={5}
        />
        <SelectController
          isAsync
          control={control}
          name="lectureIds"
          placeholder="Select are of Assessment"
          label="Select Lecture"
          dropdownPosition="bottom"
          serviceName={types.LECTURES}
        />
        <Box my={10}>
          {!opened && (
            <Button variant="outline" color="default" onClick={toggle}>
              Assessment
            </Button>
          )}
        </Box>
      </Flex>
      <Collapse in={opened}>
        {fields.map((field, index) => (
          <AssessmentFormCard
            onRemove={remove}
            onAppend={append}
            fieldsLength={fields.length}
            index={index}
            control={control}
            key={field.id}
          />
        ))}
      </Collapse>
      <Group position="right">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  )
}
FeedBackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
}

export default FeedBackForm
