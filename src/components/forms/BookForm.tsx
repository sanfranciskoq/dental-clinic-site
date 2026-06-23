"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/data/services";
import {
  bookFormSchema,
  TIME_SLOTS,
  type BookFormData,
} from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BookFormProps {
  defaultService?: string;
}

export function BookForm({ defaultService }: BookFormProps) {
  const [submitted, setSubmitted] = useState(false);
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
    await new Promise((r) => setTimeout(r, 600));
    console.log("Book form submission:", data);
    setSubmitted(true);
    toast.success("Appointment request received!");
    reset();
  };

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/20 bg-secondary/50 p-8 text-center">
        <CheckCircle2
          className="mx-auto size-12 text-primary"
          aria-hidden
        />
        <h3 className="mt-4 text-xl font-semibold text-foreground">
          Request received!
        </h3>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll call you within 24 hours to confirm your appointment time.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-full"
          onClick={() => setSubmitted(false)}
        >
          Book another appointment
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="book-name">Full name</Label>
          <Input
            id="book-name"
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
          <Label htmlFor="book-phone">Phone</Label>
          <Input
            id="book-phone"
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
      </div>

      <div>
        <Label htmlFor="book-email">Email</Label>
        <Input
          id="book-email"
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="book-date">Preferred date</Label>
          <Input
            id="book-date"
            type="date"
            min={today}
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
          <Label htmlFor="book-time">Preferred time</Label>
          <select
            id="book-time"
            className="mt-1.5 flex min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-invalid={!!errors.preferredTime}
            {...register("preferredTime")}
          >
            <option value="">Select a time</option>
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
          <Label htmlFor="book-service">Service</Label>
          <select
            id="book-service"
            className="mt-1.5 flex min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-invalid={!!errors.service}
            {...register("service")}
          >
            <option value="">Select a service</option>
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
          <legend className="text-sm font-medium">Patient type</legend>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="new"
                className="size-4 accent-primary"
                {...register("patientType")}
              />
              New patient
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="returning"
                className="size-4 accent-primary"
                {...register("patientType")}
              />
              Returning
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
        <Label htmlFor="book-notes">Additional notes (optional)</Label>
        <Textarea
          id="book-notes"
          rows={3}
          className="mt-1.5 rounded-xl"
          placeholder="Any concerns or preferences we should know?"
          {...register("notes")}
        />
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-primary"
            {...register("privacyAccepted")}
          />
          <span>
            I agree to the{" "}
            <a href="/privacy" className="text-primary underline">
              privacy policy
            </a>{" "}
            and consent to being contacted about my appointment.
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
        {isSubmitting ? "Submitting..." : "Request Appointment"}
      </Button>
    </form>
  );
}
