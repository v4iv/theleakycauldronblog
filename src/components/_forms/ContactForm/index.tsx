import * as React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
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

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is Required!',
    })
    .min(2, {message: 'Too Short!'})
    .max(50, {message: 'Too Long!'}),
  email: z
    .string({
      required_error: 'Email is Required!',
    })
    .email({message: 'Enter a Valid Email!'}),
  message: z
    .string({
      required_error: 'Message is Required!',
    })
    .min(20, {message: 'You can drop a hi on twitter @waybove!'}),
})

function ContactForm() {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })
  const {toast} = useToast()

  const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (
    data,
  ) => {
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

        <div className="mt-3 flex justify-end space-x-2">
          <Button
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
