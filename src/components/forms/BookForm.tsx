"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  createBookFormSchema,
  TIME_SLOTS,
  type BookFormData,
} from "@/lib/validations";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Service } from "@/types/service";

interface BookFormProps {
  defaultService?: string;
  services: Service[];
}

export function BookForm({ defaultService, services }: BookFormProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("forms.book");
  const tv = useTranslations("validation");
  const [submitted, setSubmitted] = useState(false);

  const bookFormSchema = useMemo(
    () =>
      createBookFormSchema({
        nameRequired: tv("nameRequired"),
        nameMin: tv("nameMin"),
        emailRequired: tv("emailRequired"),
        emailInvalid: tv("emailInvalid"),
        phoneRequired: tv("phoneRequired"),
        phoneCountryCode: tv("phoneCountryCode"),
        dateRequired: tv("dateRequired"),
        timeRequired: tv("timeRequired"),
        serviceRequired: tv("serviceRequired"),
        patientTypeRequired: tv("patientTypeRequired"),
        privacyRequired: tv("privacyRequired"),
      }),
    [tv],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      service: defaultService ?? "",
      patientType: "new",
      privacyAccepted: undefined,
    },
  });

  const onSubmit = async (data: BookFormData) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        toast.error(payload?.error ?? t("toastError"));
        return;
      }

      setSubmitted(true);
      toast.success(t("toastSuccess"));
      reset({
        service: defaultService ?? "",
        patientType: "new",
        privacyAccepted: undefined,
      });
    } catch {
      toast.error(t("toastError"));
    }
  };

  const today = new Date().toISOString().split("T")[0];

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
          {t("bookAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="book-name">{t("name")}</Label>
          <Input
            id="book-name"
            autoComplete="name"
            required
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
          <Label htmlFor="book-phone">{t("phone")}</Label>
          <Input
            id="book-phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder={t("phonePlaceholder")}
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
      </div>

      <div>
        <Label htmlFor="book-email">{t("email")}</Label>
        <Input
          id="book-email"
          type="email"
          autoComplete="email"
          required
          placeholder={t("emailPlaceholder")}
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="book-date">{t("preferredDate")}</Label>
          <Input
            id="book-date"
            type="date"
            min={today}
            required
            className="mt-1.5 min-h-11 rounded-xl"
            aria-invalid={!!errors.preferredDate}
            {...register("preferredDate")}
          />
          {errors.preferredDate && (
            <p className="mt-1 text-sm text-destructive" role="alert">
              {errors.preferredDate.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="book-time">{t("preferredTime")}</Label>
          <select
            id="book-time"
            required
            className="mt-1.5 flex min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-invalid={!!errors.preferredTime}
            {...register("preferredTime")}
          >
            <option value="">{t("selectTime")}</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className="mt-1 text-sm text-destructive" role="alert">
              {errors.preferredTime.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="book-service">{t("service")}</Label>
          <select
            id="book-service"
            required
            className="mt-1.5 flex min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-invalid={!!errors.service}
            {...register("service")}
          >
            <option value="">{t("selectService")}</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-destructive" role="alert">
              {errors.service.message}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="text-sm font-medium">{t("patientType")}</legend>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="new"
                className="size-4 accent-primary"
                {...register("patientType")}
              />
              {t("newPatient")}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="returning"
                className="size-4 accent-primary"
                {...register("patientType")}
              />
              {t("returningPatient")}
            </label>
          </div>
          {errors.patientType && (
            <p className="mt-1 text-sm text-destructive" role="alert">
              {errors.patientType.message}
            </p>
          )}
        </fieldset>
      </div>

      <div>
        <Label htmlFor="book-notes">{t("notes")}</Label>
        <Textarea
          id="book-notes"
          rows={3}
          className="mt-1.5 rounded-xl"
          placeholder={t("notesPlaceholder")}
          {...register("notes")}
        />
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            required
            className="mt-1 size-4 accent-primary"
            {...register("privacyAccepted")}
          />
          <span>
            {t.rich("privacy", {
              privacyLink: (chunks) => (
                <Link href="/privacy" className="text-primary underline">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.privacyAccepted.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full min-h-11"
        size="lg"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
