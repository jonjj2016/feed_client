// import Input from '@components/Base/UI/Input'
import PropTypes from 'prop-types'
import Input from 'src/components/UI/Input/Controller'
import { IconHeading } from '@tabler/icons-react'
import { Card, Collapse, Group } from '@mantine/core'
import { Rating, Select } from 'src/components/index'
import { useDisclosure } from '@mantine/hooks'
import { useForm, useFieldArray } from 'react-hook-form'

import TextArea from 'src/components/UI/TextArea/Controller'
import { useEffect } from 'react'
import { Button } from '@mantine/core'

const CurriculaForm = ({ onSubmit, data, lectures }) => {
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

      <br />
      <Button type="submit"> Submit</Button>
    </form>
  )
}
CurriculaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
}

export default CurriculaForm
