import { Button, Card, Collapse, Group } from '@mantine/core'
import { TextArea, Rating, Select } from 'src/components/index'
import { useDisclosure } from '@mantine/hooks'
import constants from 'src/ModalTypes/index'
import { useFind } from 'figbird'

import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect } from 'react'

const FeedbackForm = ({ onSave, defaultValue }) => {
  const { data: lectures } = useFind(constants.LECTURES)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      assessmentValues: [{ key: '', value: '5', text: '' }],
      ...defaultValue,
    },
  })

  const [opened, { open, toggle }] = useDisclosure(false)

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: 'assessmentValues',
  })
  useEffect(() => {
    if (defaultValue) {
      Object.keys(defaultValue).forEach((key) => {
        if (key == 'assessmentValues' && !defaultValue[key].length) {
          setValue(key, [{ key: '', value: '5', text: '' }])
        } else {
          setValue(key, defaultValue[key])
        }
      })
      open()
    }
  }, [defaultValue])
  const onFormSave = (values) => {
    toggle()
    onSave(reset, values)
  }
  return (
    <form onSubmit={handleSubmit(onFormSave)}>
      <TextArea
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
        register={register}
      />
      {!opened && <Button onClick={toggle}>Assessment</Button>}

      <Collapse in={true}>
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
                register={register}
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
                register={register}
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
      <br />
      <Group position="center">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  )
}

export default FeedbackForm
