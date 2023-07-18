import * as React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {encode} from '@/lib/utils'
import validationSchema from './validationSchema'

type FormData = {
  name: string
  email: string
  message: string
}

const ContactForm: React.FC = () => {
  const methods = useForm<FormData>({resolver: yupResolver(validationSchema)})

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    try {
      await fetch('/?no-cache=1', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: encode({
          'form-name': 'Contact',
          ...data,
        }),
      })
    } catch (err) {
      console.error(err)
      alert('Error: Please Try Again!')
    }
  }

  return (
    <Form {...methods}>
      <form
        name="Contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        <FormField
          control={methods.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="message"
          render={({field}) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="reset"
          variant="outline"
          disabled={methods.formState.isSubmitting}
        >
          Clear
        </Button>
        <Button type="submit" disabled={methods.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export {ContactForm}
