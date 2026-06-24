"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const t = useTranslations("forms.contact");
  const tv = useTranslations("validation");
  const [submitted, setSubmitted] = useState(false);

  const contactFormSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, tv("nameMin")),
        email: z.string().email(tv("emailInvalid")),
        phone: z.string().min(10, tv("phoneInvalid")),
        message: z.string().min(10, tv("messageMin")),
      }),
    [tv],
  );

  type ContactFormData = z.infer<typeof contactFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("Contact form submission:", data);
    setSubmitted(true);
    toast.success(t("toastSuccess"));
    reset();
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/20 bg-secondary/50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-foreground">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-muted-foreground">{t("successDescription")}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-full"
          onClick={() => setSubmitted(false)}
        >
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="contact-name">{t("name")}</Label>
        <Input
          id="contact-name"
          className="mt-1.5 min-h-11 rounded-xl"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="contact-email">{t("email")}</Label>
        <Input
          id="contact-email"
          type="email"
          className="mt-1.5 min-h-11 rounded-xl"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="contact-phone">{t("phone")}</Label>
        <Input
          id="contact-phone"
          type="tel"
          className="mt-1.5 min-h-11 rounded-xl"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="contact-message">{t("message")}</Label>
        <Textarea
          id="contact-message"
          rows={5}
          className="mt-1.5 rounded-xl"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full min-h-11"
        size="lg"
      >
        {isSubmitting ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
