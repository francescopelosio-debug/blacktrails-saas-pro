import { FormLayout, SubmitButton } from '@saas-ui/forms'
import { Form } from './form'
import * as z from 'zod'
import { Meta } from '@storybook/react'

export default {
  title: 'Components/Form',
  component: Form,
} as Meta

const schema = z.object({
  title: z.string().min(4),
  date: z.string(),
  description: z.string().min(4),
})

export const Default = {
  render: () => (
    <Form
      schema={schema}
      defaultValues={{
        title: '',
        date: '',
        description: '',
      }}
      onSubmit={async (data) => console.log(data)}
    >
      {({ Field }) => (
        <FormLayout>
          <Field name="title" label="Title" />
          <Field name="date" label="Date" type="date" />
          <Field name="description" label="Description" type="editor" />
          <SubmitButton />
        </FormLayout>
      )}
    </Form>
  ),
  args: {},
}
