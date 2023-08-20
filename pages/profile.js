import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
  } from '@chakra-ui/react'

const ProfileEditable = () => { 
    return (
        <>
        <Editable defaultValue='Drop a line.'>
  <EditablePreview />
  <EditableInput />
        </Editable>
        </>
    )
}
