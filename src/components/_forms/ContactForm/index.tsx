import React from 'react'
import * as z from 'zod'
import {Loader2} from 'lucide-react'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {useForm, SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {encode} from '@/lib/utils'
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
import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {useToast} from '@/components/ui/use-toast'

function ContactForm() {
  const {t} = useTranslation('common')

  const formSchema = z.object({
    name: z
      .string({
        required_error: t('contact-form.name-required'),
      })
      .trim()
      .min(2, {message: t('contact-form.name-too-short')})
      .max(50, {message: t('contact-form.name-too-long')}),
    email: z
      .string({
        required_error: t('contact-form.email-required'),
      })
      .trim()
      .email({message: t('contact-form.invalid-email')}),
    message: z
      .string({
        required_error: t('contact-form.message-required'),
      })
      .trim()
      .min(20, {
        message: t('contact-form.message-too-short'),
      }),
  })

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
        title: t('contact-form.success-toast-title'),
        description: t('contact-form.success-toast-description'),
      })

      methods.reset()
    } catch (err) {
      console.error(err)

      toast({
        variant: 'destructive',
        title: t('contact-form.error-toast-title'),
        description: t('contact-form.error-toast-description'),
      })
    }
  }

  const submitDisabled = methods.formState.isSubmitting

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
              <FormLabel className="font-mono">
                {t('contact-form.name')}
              </FormLabel>

              <FormControl>
                <Input
                  className="font-mono animate-in slide-in-from-bottom"
                  disabled={submitDisabled}
                  {...field}
                />
              </FormControl>

              <FormDescription className="font-mono" />

              <FormMessage className="font-mono" />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-mono">
                {t('contact-form.email')}
              </FormLabel>

              <FormControl>
                <Input
                  className="font-mono animate-in slide-in-from-bottom"
                  disabled={submitDisabled}
                  {...field}
                />
              </FormControl>

              <FormDescription className="font-mono" />

              <FormMessage className="font-mono" />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="message"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-mono">
                {t('contact-form.message')}
              </FormLabel>

              <FormControl>
                <Textarea
                  className="font-mono animate-in slide-in-from-bottom"
                  rows={12}
                  disabled={submitDisabled}
                  {...field}
                />
              </FormControl>

              <FormDescription className="font-mono" />

              <FormMessage className="font-mono" />
            </FormItem>
          )}
        />

        <div className="mt-3 flex justify-end space-x-2">
          <Button
            className="font-mono animate-in zoom-in"
            variant="outline"
            type="reset"
            disabled={methods.formState.isSubmitting}
            onClick={() => methods.reset()}
          >
            {t('contact-form.clear')}
          </Button>

          <Button
            className="font-mono animate-in zoom-in"
            type="submit"
            disabled={submitDisabled}
          >
            {submitDisabled && <Loader2 className="mr-2 size-4 animate-spin" />}

            {submitDisabled
              ? t('contact-form.submitting')
              : t('contact-form.submit')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export {ContactForm}
