import { z } from "zod";

/** Strip formatting so +1 (512) 555-0142 validates as +15125550142 */
export function normalizePhone(phone: string) {
  return phone.replace(/[\s\-().]/g, "");
}

/** name@domain.tld — requires @ and a domain with a TLD */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** E.164-style: leading +, country code, 7–15 digits total */
export const PHONE_WITH_COUNTRY_CODE_PATTERN = /^\+[1-9]\d{6,14}$/;

export type BookFormValidationMessages = {
  nameRequired: string;
  nameMin: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneCountryCode: string;
  dateRequired: string;
  timeRequired: string;
  serviceRequired: string;
  patientTypeRequired: string;
  privacyRequired: string;
};

export const defaultBookFormValidationMessages: BookFormValidationMessages = {
  nameRequired: "Full name is required",
  nameMin: "Name must be at least 2 characters",
  emailRequired: "Email is required",
  emailInvalid: "Enter a valid email (example@domain.com)",
  phoneRequired: "Phone number is required",
  phoneCountryCode: "Include country code (e.g. +1 512 555 0142)",
  dateRequired: "Please select a preferred date",
  timeRequired: "Please select a preferred time",
  serviceRequired: "Please select a service",
  patientTypeRequired: "Please select patient type",
  privacyRequired: "You must accept the privacy policy",
};

export function createBookFormSchema(messages: BookFormValidationMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, messages.nameRequired)
      .min(2, messages.nameMin),
    email: z
      .string()
      .trim()
      .min(1, messages.emailRequired)
      .regex(EMAIL_PATTERN, messages.emailInvalid),
    phone: z
      .string()
      .trim()
      .min(1, messages.phoneRequired)
      .transform(normalizePhone)
      .refine((value) => PHONE_WITH_COUNTRY_CODE_PATTERN.test(value), {
        message: messages.phoneCountryCode,
      }),
    preferredDate: z.string().min(1, messages.dateRequired),
    preferredTime: z.string().min(1, messages.timeRequired),
    service: z.string().min(1, messages.serviceRequired),
    patientType: z.enum(["new", "returning"], {
      message: messages.patientTypeRequired,
    }),
    notes: z.string().optional(),
    privacyAccepted: z.literal(true, {
      message: messages.privacyRequired,
    }),
    locale: z.enum(["en", "uk"]).optional(),
  });
}

export const bookFormServerSchema = createBookFormSchema(
  defaultBookFormValidationMessages,
);

export type BookFormData = z.infer<ReturnType<typeof createBookFormSchema>>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
] as const;
