import React from "react"
import * as z from "zod"
import { Circle } from "lucide-react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { encode } from "@/lib/utils"
import { useTranslations } from "@/i18n/utils"
import { defaultLang, type languages } from "@/i18n/ui"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

function ContactForm({
  lang = defaultLang,
}: {
  lang?: keyof typeof languages
}) {
  const t = useTranslations(lang)

  const formSchema = z.object({
    name: z
      .string({
        error: t("contact.name-required"),
      })
      .trim()
      .min(2, { error: t("contact.name-too-short") })
      .max(50, { error: t("contact.name-too-long") }),
    email: z
      .email({
        error: t("contact.invalid-email"),
      })
      .trim(),
    message: z
      .string({
        error: t("contact.message-required"),
      })
      .trim()
      .min(20, {
        error: t("contact.message-too-short"),
      }),
  })

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (
    data,
  ) => {
    try {
      await fetch("/?no-cache=1", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "Contact",
          ...data,
        }),
      })

      toast(t("contact.success-toast-title"), {
        description: t("contact.success-toast-description"),
      })

      methods.reset()
    } catch (err) {
      console.error(err)

      toast(t("contact.error-toast-title"), {
        description: t("contact.error-toast-description"),
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
        className="space-y-5"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xl uppercase">
                {t("contact.name")}
              </FormLabel>

              <FormControl>
                <Input
                  className="font-mono"
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xl uppercase">
                {t("contact.email")}
              </FormLabel>

              <FormControl>
                <Input
                  className="font-mono"
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xl uppercase">
                {t("contact.message")}
              </FormLabel>

              <FormControl>
                <Textarea
                  className="font-mono"
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
            className="font-mono text-xl uppercase"
            variant="outline"
            type="reset"
            size="lg"
            disabled={methods.formState.isSubmitting}
            onClick={() => methods.reset()}
          >
            {t("contact.clear")}
          </Button>

          <Button
            size="lg"
            className="bg-teal-300 font-mono text-xl text-slate-950 uppercase hover:bg-teal-800 hover:text-white"
            type="submit"
            disabled={submitDisabled}
          >
            {submitDisabled && <Circle className="mr-2 size-6 animate-ping" />}

            {submitDisabled ? t("contact.submitting") : t("contact.submit")}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { ContactForm }
