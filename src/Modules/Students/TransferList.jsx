import { useEffect, useState } from 'react'
import { TransferList } from '@mantine/core'

const initialValues = [
  [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'next', label: 'Next.js' },
    { value: 'blitz', label: 'Blitz.js' },
    { value: 'gatsby', label: 'Gatsby.js' },
    { value: 'vue', label: 'Vue' },
    { value: 'jq', label: 'jQuery' },
  ],
  [
    { value: 'sv', label: 'Svelte' },
    { value: 'rw', label: 'Redwood' },
    { value: 'np', label: 'NumPy' },
    { value: 'dj', label: 'Django' },
    { value: 'fl', label: 'Flask' },
  ],
]

const StudentsTransferList = ({ studentsList, groupData }) => {
  const [data, setData] = useState(initialValues)

  useEffect(() => {
    if (studentsList) {
      const all = studentsList.map((i) => ({
        label: `${i.fName} ${i.lName}`,
        value: i._id,
      }))
      const groups = groupData.participantIds.map((i) => ({
        label: `${i.fName} ${i.lName}`,
        value: i._id,
      }))

      setData([all, groups])
    }
  }, [studentsList])
  return (
    <TransferList
      value={data}
      onChange={setData}
      searchPlaceholder="Search..."
      nothingFound="Nothing here"
      titles={['All Users', 'Group Users']}
      breakpoint="sm"
    />
  )
}
export default StudentsTransferList
