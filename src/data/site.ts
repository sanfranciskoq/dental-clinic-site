export const siteConfig = {
  name: "Bright Smile Dental",
  tagline: "Gentle, modern dentistry in Austin",
  description:
    "Family-friendly dental care with same-day emergencies, digital X-rays, and transparent pricing. New patients welcome.",
  city: "Austin",
  state: "TX",
  phone: "(512) 555-0142",
  phoneHref: "tel:+15125550142",
  email: "hello@brightsmile.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brightsmile.com",
  address: {
    street: "1247 Oak Avenue, Suite 200",
    city: "Austin",
    state: "TX",
    zip: "78701",
    full: "1247 Oak Avenue, Suite 200, Austin, TX 78701",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.231!2d-97.7431!3d30.2672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE2JzAyLjAiTiA5N8KwNDQnMzUuMiJX!5e0!3m2!1sen!2sus!4v1",
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    google: "https://google.com/maps",
  },
  stats: {
    rating: 4.9,
    reviewCount: 312,
    yearsInPractice: 15,
    patientsServed: "10,000+",
  },
  badges: ["ADA Member", "New Patients Welcome", "Free Parking"],
  parkingNote:
    "Free parking in the lot behind our building. Accessible spaces near the main entrance.",
  wheelchairAccessible: true,
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
