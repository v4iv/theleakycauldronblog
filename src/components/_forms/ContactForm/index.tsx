import * as React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Loader2} from 'lucide-react'
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
import {useToast} from '@/components/ui/use-toast'
import {encode} from '@/lib/utils'
import validationSchema from './validationSchema'

type FormData = {
  name: string
  email: string
  message: string
}

function ContactForm() {
  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })
  const {toast} = useToast()

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

      toast({
        title: 'Your Message Was Sent Successfully!',
        description: "I'll Get Back To You ASAP!",
      })

      methods.reset()
    } catch (err) {
      console.error(err)

      toast({
        title: 'Error!',
        description: 'Please Try Again!',
      })
    }
  }

  const submitDisabled =
    methods.formState.isSubmitting || methods.formState.isSubmitted

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
                <Textarea rows={12} {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-3 flex justify-end">
          <Button
            className="mr-2"
            variant="outline"
            type="reset"
            disabled={methods.formState.isSubmitting}
            onClick={() => methods.reset()}
          >
            Clear
          </Button>

          <Button type="submit" disabled={submitDisabled}>
            {methods.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {methods.formState.isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export {ContactForm}
